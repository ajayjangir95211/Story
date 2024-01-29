#include "line.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *read_line()
{
    int buf_size = BUF_SIZE;
    char *buffer = (char *)malloc(sizeof(char) * buf_size);
    if (!buffer)
    {
        fprintf(stderr, "%d line %s allocation error", __LINE__, __func__);
        exit(EXIT_FAILURE);
    }

    char c;
    int index = 0;
    while (1)
    {
        c = getchar();
        if (c == EOF || c == '\n')
        {
            buffer[index] = '\0';
            return buffer;
        }
        else
        {
            buffer[index] = c;
        }
        index++;

        if (index == BUF_SIZE)
        {
            buf_size += BUF_SIZE;
            buffer = realloc(buffer, buf_size);
            if (!buffer)
            {
                fprintf(stderr, "%d line %s allocation error", __LINE__, __func__);
                exit(EXIT_FAILURE);
            }
        }
    }
}

char **split_line(char *line)
{
    int buf_size = TOKEN_BUF_SIZE;
    char **tokens = malloc(sizeof(char *) * buf_size);
    if (!tokens)
    {
        fprintf(stderr, "%d line %s allocation error", __LINE__, __func__);
        exit(EXIT_FAILURE);
    }

    char *token;
    int index = 0;
    token = strtok(line, " \t\r\n\a");
    while (token != NULL)
    {
        tokens[index] = token;
        index++;

        if (index == TOKEN_BUF_SIZE)
        {
            buf_size += TOKEN_BUF_SIZE;
            tokens = realloc(tokens, buf_size);
            if (!tokens)
            {
                fprintf(stderr, "%d line %s allocation error", __LINE__, __func__);
                exit(EXIT_FAILURE);
            }
        }

        token = strtok(NULL, " \t\r\n\a");
    }
    tokens[index] = NULL;
    return tokens;
}
