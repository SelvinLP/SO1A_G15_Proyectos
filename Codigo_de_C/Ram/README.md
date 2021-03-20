# Manual de configuracion
Ver la versión del kernel

```
uname -r
```

Revisar módulos instalados, esto listará todos los módulos instalados en el kernel

```
lsmod
```

Revisamos o "buscamos" unicamente un módulo

```
lsmod | grep "[nombre_modulo]"
```

### Instalar dependencias
Descargar headers del módulo específico que tenemos

```c
sudo apt-get install linux-headers-$(uname -r)
```

Descargar build essentials, para compilar el código c

```c
sudo apt-get install build-essential
```

### Instalar modulo
Compilar archivos

```
make
```

Instalar el módulo con el comando insmod

https://linux.die.net/man/8/insmod#:~:text=insmod%20is%20a%20trivial%20program,is%20taken%20from%20standard%20input

Revisar los logs de los modulos

```
sudo dmesg
```

Ahora, revisamos el documento generado, cada vez que lo revisemos se reescribirá

```
$ cat /proc/[nombre_modulo]
```

Para iniciarl el contenedor ingresar el siguiente comando

sudo docker run -dit --name cont_server -v /proc/:/elements/procs/ -p 3000:3000 img_server

### Eliminar el modulo
No se espera ninguna salida cuando este comando es exitoso.

$ sudo rmmod "[nombre_modulo]"