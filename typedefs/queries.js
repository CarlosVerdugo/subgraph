export default `#graphql

  type Query {
    user(email: String!): User
    logIn(email: String!, password: String!): User
    users: [User!]
    actividades(fono: String!, obj: objInput): [Actividad!]
    actividadesEnCasa: [ActividadCasa!]
    actividadEnCasa(id: Int!): ActividadCasa!
    pacientes: [Paciente!]
    sesiones(rut: String!): [Sesion]
    sesion(id: Int!): Sesion!
  }

`
