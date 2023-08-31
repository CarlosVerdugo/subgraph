import * as md from "../models/mongoDBmodels.js";

export default {

    Query: {
        async users() {
            return await md.User.find().sort();
        },
        async user(_, {email}) {
            return await md.User.findOne({email: email});
        },
        async pacientes() {
            return await md.Paciente.find().sort();
        },
        async actividades(_, {fono, obj}) {
            if(obj != null) {
                return await md.Actividad.find({email_usr: fono, objetivo: obj}).sort({nombre: -1});
            } else {
                return await md.Actividad.find({email_usr: fono}).sort({nombre: -1});
            }
        },
        async actividadesEnCasa() {
            return await md.ActividadCasa.find().sort({nombre: 1});
        },
        async actividadEnCasa(_, {id}) {
            return await md.ActividadCasa.findById(id);
        },
        async sesiones(_, {rut}) {
            const paciente = await md.Paciente.findOne({rut: rut});
            return paciente.sesiones;
        },
        async sesion(_, {id}) {
            return await md.Sesion.findById(id);
        },
        async logIn(_, {email, password}) {
            return await md.User.findOne({email: email, password: password});
        }
    },

    Mutation: {
        async newActivity(_, {actividad}) {
            let newId = await md.Actividad.count();
            newId++;
            const res = new md.Actividad({
                _id: newId,
                email_usr: actividad.email_usr,
                nombre: actividad.nombre,
                descripcion: actividad.descripcion,
                objetivo: actividad.objetivo,
                criterios_exito: actividad.criterios_exito,
                materiales: actividad.materiales,
            });
            await res.save();
            return res;
        },
        async newSesion(_, {sesion}) {
            let newId = await md.Sesion.count();
            newId++;
            const res = new md.Sesion({
                _id: newId,
                numero: sesion.numero,
                fecha_hora: sesion.fecha_hora,
                duracion: sesion.duracion,
                actividades: sesion.actividades,
                comentarios: sesion.comentarios,
                porcentaje_logro: sesion.porcentaje_logro,
                evaluada: sesion.evaluada,
            });
            await res.save();
            return res;
        },
        async actEval(_, {sesionId, actId, critId, evaluation}) {
            const ses = await md.Sesion.findById(sesionId);
            ses.actividades.id(actId).criterios_exito.id(critId).$set("porcentaje_logro", evaluation);
            await ses.save();
            return await md.Sesion.findById(sesionId);
        },
        async sesionEval(_, {id, evaluation, comment}) {
            if(comment != null) {
                await md.Sesion.updateOne({_id: id}, {porcentaje_logro: evaluation, comentarios: comment, evaluada: true});
                return await md.Sesion.findById(id);
            }else {
                await md.Sesion.updateOne({_id: id}, {porcentaje_logro: evaluation, evaluada: true});
                return await md.Sesion.findById(id);
            }
        },
        async autoEval(_, {actId, critId, evaluation, comentarios}) {
            const act = await md.ActividadCasa.findById(actId);
            if(comentarios != null) {
                act.$set("comentarios", comentarios);
            }
            act.criterios_exito.id(critId).$set("porcentaje_logro", evaluation);
            await act.save();
            return await md.ActividadCasa.findById(actId);
        }
    },

};