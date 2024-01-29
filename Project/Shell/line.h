#ifndef LINE_H
#define LINE_H

#define BUF_SIZE 256
#define TOKEN_BUF_SIZE 16

char *read_line();
char **split_line(char *line);

#endif