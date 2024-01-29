#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int shell_cd(char **args)
{
    printf("In %s %s\n", __func__, args[1]);
    if (args[1])
    {
        if (!chdir(args[1]))
            printf("Succcess\n");
        else
            perror(__func__);
    }
    else
    {
        printf("Expected second argument to cd\n");
    }
    return 1;
}

int shell_help(char **args)
{
    printf("Help.... \n");
    return 1;
}

int shell_exit(char **args)
{
    printf("Shell Terminated \n");
    return 0;
}