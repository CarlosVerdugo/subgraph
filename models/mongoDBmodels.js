import { model, Schema } from "mongoose"

const User_sch = new Schema({
    email: String,
    password: String,
    type: String,
    full_name: String,
    pacientes: [String]
}, {collection: 'usuarios', versionKey: false});

const CriterioExito_sch = new Schema({
    _id: Number,
    nombre: String,
    porcentaje_logro: Number
}, {collection: 'criterios_exito', versionKey: false, _id: false});

const Objetivo_sch = new Schema({
    _id: Number,
    nombre: String,
}, {collection: 'objetivos', versionKey: false});

const Actividad_sch = new Schema({
    _id: Number,
    email_usr: String,
    nombre: String,
    descripcion: String,
    objetivo: Objetivo_sch,
    criterios_exito: [CriterioExito_sch],
    materiales: [String]
}, {collection: 'actividades', versionKey: false});

const ActividadCasa_sch = new Schema({
    _id: Number,
    nombre: String,
    descripcion: String,
    criterios_exito: [CriterioExito_sch],
    comentarios: String,
    fecha: String,
    evaluada: Boolean
}, {collection: 'actividades_casa', versionKey: false});

const Sesion_sch = new Schema({
    _id: Number,
    numero: Number,
    fecha_hora: String,
    duracion: Number,
    actividades: [Actividad_sch],
    comentarios: String,
    porcentaje_logro: Number,
    evaluada: Boolean
}, {collection: 'sesiones', versionKey: false});

const Paciente_sch = new Schema({
    rut: String,
    nombre_completo: String,
    fecha_nacimiento: String,
    edad: Number,
    curso: String,
    direccion: String,
    diagnostico: String,
    sesiones: [Sesion_sch],
    actividades_casa: [ActividadCasa_sch]
}, {collection: 'pacientes', versionKey: false});

export const User = model("Usuario", User_sch);
export const CriterioExito = model("Criterio", CriterioExito_sch)
export const Objetivo = model("Objetivo", Objetivo_sch)
export const Actividad = model("Actividad", Actividad_sch);
export const ActividadCasa = model("ActividadCasa", ActividadCasa_sch);
export const Sesion = model("Sesion", Sesion_sch);
export const Paciente = model("Paciente", Paciente_sch);

