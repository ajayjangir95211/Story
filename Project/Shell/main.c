#include "line.h"
#include "exe.h"
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char const *argv[])
{
    char *line;
    char **tokens;
    int status;
    do
    {
        line = read_line();
        tokens = split_line(line);
        status = execute(tokens);
        free(line);
        free(tokens);
    } while (status);
    return 0;
}
