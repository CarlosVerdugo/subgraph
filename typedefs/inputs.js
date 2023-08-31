export default `#graphql

  # Inputs

  input LoginInput {
    email: String!
    password: String!
  }

  input objInput {
    id: Int!
    nombre: String!
  }

  input critInput {
    nombre: String!
    porcentaje_logro: Float
  }

  input newAct {
    id: Int!
    email_usr: String!
    nombre: String!
    descripcion: String!
    objetivo: objInput!
    criterios_exito: [critInput!]
    materiales: [String]
  }

  input newSes {
    numero: Int!
    fecha_hora: String!
    duracion: Int!
    actividades: [newAct!]
    comentarios: String
    porcentaje_logro: Float
    evaluada: Boolean!
  }

  # Outputs

  type LoginResult {
    auth: Boolean!
    mensaje: String
  }
`
