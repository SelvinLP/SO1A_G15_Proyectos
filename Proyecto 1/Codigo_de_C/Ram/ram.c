#include <linux/module.h> 
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/list.h>
#include <linux/types.h>
#include <linux/slab.h>
#include <linux/sched.h>
#include <linux/string.h>
#include <linux/fs.h>
#include <linux/seq_file.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h> 
#include <linux/hugetlb.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Selvin Lisandro Aragón Pérez");
MODULE_DESCRIPTION("Modulo para obtener la ram");
MODULE_VERSION("0.01");

static int my_proc_show(struct seq_file *m, void *v){
    //Memoria en MB
    struct sysinfo i;
    si_meminfo(&i);
    int32_t ramLibre = ((i.freeram*i.mem_unit)/(1024*1024));
    int32_t ramTotal = ((i.totalram*i.mem_unit)/(1024*1024));
    int32_t ramocupado = ramTotal - ramLibre;
    seq_printf(m, "{ \"total\": %d , \"ocupado\": %d}", ramTotal, ramocupado);
    return 0;
}

static ssize_t my_proc_write(struct file *file, const char __user *buffer, size_t count, loff_t *f_pos){
    return 0;
}

static int my_proc_open(struct inode *inode, struct file *file){
    return single_open(file, my_proc_show, NULL);
}

static struct file_operations my_fops = {
    .owner = THIS_MODULE,
    .open = my_proc_open,
    .release = single_release,
    .read = seq_read,
    .llseek = seq_lseek,
    .write = my_proc_write
};

static int __init init_p(void){
        struct proc_dir_entry *entry;
        entry = proc_create("ram-module", 0777, NULL, &my_fops);
        if(!entry) {
                return -1;
        } else {
                printk(KERN_INFO "Inicio del modulo \n");
        }
        return 0;
}

static void __exit exit_p(void){
        remove_proc_entry("ram-module",NULL);
        printk(KERN_INFO "Final del modulo \n");
}

module_init(init_p);
module_exit(exit_p);