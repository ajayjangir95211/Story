#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <sys/wait.h>
#include "builtin.h"

int launch(char **args);

int execute(char **tokens)
{
    printf("In : %s\n", __func__);
    if (tokens[0])
    {
        for (int i = 0; i < builtin_cmd_num; i++)
        {
            if (strcmp(tokens[0], builtin_cmd[i]) == 0)
            {
                return (*builtin_cmd_func[i])(tokens);
            }
        }

        return launch(tokens);
    }
    else
    {
        printf("NULL argument %s\n", __func__);
    }
}

int launch(char **args)
{
    pid_t pid, wpid;
    int status;

    pid = fork();
    if (pid == 0)
    {
        if (execvp(args[0], args) == -1)
            perror(__func__);
        exit(EXIT_FAILURE);
    }
    else
    {
        if (pid > 0)
        {
            do
            {
                wpid = waitpid(pid, &status, WUNTRACED);
            } while (!WIFEXITED(status) && !WIFSIGNALED(status));
        }
        else
            perror(__func__);
    }

    return 1;
}