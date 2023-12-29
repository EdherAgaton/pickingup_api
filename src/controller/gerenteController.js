const {pool} = require('../routes/database')



const updateCortes = async (req, res) => {
    const { id_usuario, nombre, sucursal, fechaCorte, cantidadEntregada, referencia, img  } = req.body


    try {
        const result = await pool.query()
    } catch (error) {
        
    }
}


const viewCortes = async (req , res) => {

 

    const {id_usuario, sucursal} = req.body

    const currentDate = new Date()

    /*  JSON DE PRUEBA

      {
    "id_usuario" : "001GERENTE01",
    "sucursal" : "NAV",
    "fecha" : "2023-12-29"

    }   

    */


  

    const currentDay = currentDate.getDay() -1
    const currentMonth = currentDate.getMonth() +1
    const currentYear = currentDate.getFullYear()

    const actualDate =  currentYear+"-"+ currentMonth +"-"+ currentDay

    try {
        
        const result = await pool.query('SELECT * FROM corte WHERE id_usuario_cierre = $1 AND id_sucursal = $2 AND fecha_cierre >= $3 ', [id_usuario, sucursal, actualDate])


        if(result.rows.length === 0){
            res.status(404).json({error: "ERROR AL CARGAR CORTES"})
        }else{
            const data = result.rows

            /*

            "data": [
        {
            "id_corte": "2",
            "id_sucursal": "NAV",
            "saldo_inicial": "120.00",
            "id_usuario_inicio": "001GERENTE01",
            "id_usuario_cierre": "001GERENTE01",
            "saldo_cierre": "130.00",
            "fecha_inicio": "2023-12-28T06:00:00.000Z",
            "fecha_cierre": "2023-12-28T06:00:00.000Z",
            "hora_inicio": "10:01:20-06",
            "hora_cierre": "20:01:20-06"
        },


        id_corte: data.id_corte, 
            id_sucursal : data.id_sucursal,
            saldo_inicial : data.id_usuario_inicio,
            saldo_cierre : data.saldo_cierre,
            id_usuario_inicio : data.id,
            fecha_inicio : data.fecha_inicio,
            fecha_cierre : data.fecha_cierre,
            hora_inicio : data.hora_inicio,
            hora_cierre : data.hora_cierre


            */

            res.status(200).json({menssage: "CONSUTA DE CORTES REALIZADA CON EXITO", data: data})
        }
        
    } catch (error) {

        console.error('Error en la consulta:', error);
          res.status(500).json({ error: 'Error en la consulta JSON' });
        
    }

}




module.exports = {
    viewCortes,
    updateCortes
}



