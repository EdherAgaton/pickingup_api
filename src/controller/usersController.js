const { error } = require('console')
const {pool} = require('../routes/database')


const getUserById = async (req, res) => {

    const { user, password } = req.body

    //const id_usuario = req.params.id;
    //const password = req.params.password;

    


    if (user != null && password != null) {
        try {
          const result = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1 AND contrasena = $2', [user, password]);
    
          if (result.rows.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
          } else {
            const data = result.rows[0];
            res.status(200).json({
              message: 'Inicio de sesión exitoso',
              user_id: data.id_usuario,
              user_name: data.nombre,
              user_role: data.rol
            });
          }
        } catch (error) {
          console.error('Error en la consulta:', error);
          res.status(500).json({ error: 'Error en la consulta JSON' });
        }
      } else {
        res.status(400).json({ error: 'Faltan datos de usuario y contraseña' });
      }
   

}

const probarConexion = async (req, res)=>{
    pool.connect()
        .then(() => {
            res.status(200).json({mensage : 'Conexion exitosa a la base de datos'})
            console.log('Conexion exitosa  a la base de datos')
        })
        .catch((err)=> {
            console.error('Error al conectar a la base de datos');
        })
        .finally(() => {
         /*   pool.end()
                .then(()=> {
                    console.log('Conexion terminada con exito');
                })
                .catch((err) => {
                    console.error('Error al cerrar la conexion', err);
                })

                */
        })


}


module.exports = {
    probarConexion,
    getUserById
}
