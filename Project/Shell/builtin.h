
#ifndef BUILTIN_H
#define BUILTIN_H

int shell_cd(char **args);
int shell_help(char **args);
int shell_exit(char **args);

char *builtin_cmd[] = {"cd", "help", "exit"};
int builtin_cmd_num = sizeof(builtin_cmd) / sizeof(char *);

int (*builtin_cmd_func[])(char **args) = {&shell_cd, &shell_help, &shell_exit};

#endif