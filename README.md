# Creamos el scaffolding del proyecto agregando las dependencias de spring web, lombook y mongo
![image](https://github.com/user-attachments/assets/a9cae80d-87f1-4d7f-a5d5-4193ab096d02)

# Creamos el modelo vista-Controlador dentro del scafffolding generado por spring initialzr 
![image](https://github.com/user-attachments/assets/b998816f-b043-4a53-9963-25b504567e8b)


# Generamos las clases del model para implementar la solución al problema planteado 

![image](https://github.com/user-attachments/assets/310e3d5d-81e4-49bd-9a42-4c01fb6c1d2d)
![image](https://github.com/user-attachments/assets/90950f8d-c9b3-4ad5-b7ee-8b538c0bebe1)
![image](https://github.com/user-attachments/assets/beb8efa0-022d-4048-89fc-4da1666ebef7)
![image](https://github.com/user-attachments/assets/f2d80fef-7543-4fe1-a5dd-0d47aa60f945)

# Creamos los repositorios para guardar los datos asociados a los modelos 
![image](https://github.com/user-attachments/assets/231a7b1f-4fb0-4265-93fd-b66ac781eb12)

# Ya teniendo los modelos y los repositorios creamos los servicios que vamos a usar de los modelos 
# El principal es paymentService el cual va realizar el consultar el pago y generar la factura. Este va verificar que el precio dado por el usuario sea el correcto y si es asi crea una factura
![image](https://github.com/user-attachments/assets/e69696c0-857a-466b-8b1f-d0350c0d1031)


#Creamos los controladores para payment y para los otros modelos.

![image](https://github.com/user-attachments/assets/763acd26-c991-4128-9e87-e86142f2bfa0)

# Ya teniendo la estructura de todo el proyecto , vamos con las configuraciones de mongo 

# En el archivo application.properties agregamos la direccion de la base de datos creada en Mongo 


# Se agrega el nombre de la database que se esta usando y la contraseña la cual esta asignada en mongo 
![image](https://github.com/user-attachments/assets/d1e20244-0a7c-4171-90d8-abf722880d2c)

![image](https://github.com/user-attachments/assets/5c29bc39-7720-4ac2-a4e8-6c4d04ddb5ef)


# Ahora generamos un archivo de configuracion el cual va permitir que el front creado en react se conecte al backend 

![image](https://github.com/user-attachments/assets/eb057f2a-f6eb-430a-a099-4ab06be5b619)



# Ya esta el back listo, realizamos pruebas en postman para ver que este funcionando correctamente y esten funcionando los controladores 
# No se muestran usuarios ya que no hay datos registrados 

![image](https://github.com/user-attachments/assets/d3ca7427-285b-4f09-9249-19adad62d99d)



# Ya teniendo todo funcionando correctamente , desplegamos en ashure el proyecto 

# Este se hace creando una nueva conexión, asociando el github del proyecto ( en este caso el backend) y esperando unos minutos a que se despliegue el proyecto

![image](https://github.com/user-attachments/assets/c5994f10-b1d1-40f8-aeb5-5b59a2dd2b0c)



# Ahora para crear el frontend , generamos el scaffolding con ayuda de npx create 

![image](https://github.com/user-attachments/assets/14bd9fd6-44a9-4739-a63f-225bda0ae734)



# Agregamos un archivo de configuración el cual va permitir que nos conectemeos al link de ashure donde esta desplegado el proyecto

![image](https://github.com/user-attachments/assets/b4aceccf-6588-47f7-9330-41f529838f35)



# Ya con esto , empezamos a generar el codigo del front usando la IRL en los metodos en los cuales vamos a conectar el back con el front y sus funcionalidades 

![image](https://github.com/user-attachments/assets/626688b7-8ffe-4bbb-8e81-86125577b5e3)



# Ya con el front completo en su mayoria, ejecutamos el proyecto con el comando npm start. Este nos abrira un link desde el navegador en el cual se vera el front del proyecto

![image](https://github.com/user-attachments/assets/9ab7e640-0daa-4ee0-95ba-8ca06c5dcf1d)
![image](https://github.com/user-attachments/assets/7d2d0c3f-b570-498b-b0b8-13009f4b8d8d)





