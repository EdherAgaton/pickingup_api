const { error } = require('console')
const {pool} = require('../routes/database')

const getUserById = async (req, res) => {

    const { user, password } = req.body

    //const id_usuario = req.params.id;
    //const password = req.params.password;

    



    if(user != null && password != null ){

        const response = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1 AND contrasena = $2', [user, password], (error, result) => {
            if(error){
                console.error('Error en la consulta ', error);
                res.status(500).json({error: 'Error en la consulta JSON'})
            }else if (!result || result.lenght === 0 ) {
                res.status(404).json({error: 'Usuario no encontrado'})
                
            }else{
                res.json({mensage : 'Inicio de sesion exitoso', user: result[0] })
            }

        })

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