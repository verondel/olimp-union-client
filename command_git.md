## Первоначальные настройки
```bash
git config -l

git config --global <option>

git config --global user.name "Kirill Vercetti"
git config --global user.email office@kyzima-spb.com
```

   Окончания строк:
   https://htmlacademy.ru/blog/boost/tools/konec-stroki

   core.safecrlf = true - перед записью в базу данных при подготовке к замене CRLF на LF,
   Git убедится, что сможет успешно прервать операцию.
   Он проверит, что можно откатить изменения (из LF в CRLF), а если нет, то отменит операцию.
   Полезно, когда специфические бинарники похожие на текстовые файлы.

#### Создаем репозиторий Git для нового проекта
```bash
git init
   ```

####  Клонируем репозиторий Git для существующего проекта
```bash
git clone <url>
git clone <url> <path>
```




#### Проверка состояния
```bash
git status
```



#### Индексация изменений
```bash
git add <path> <path> ... <path>
   ```


#### Коммит (фиксация) изменений
```bash
git commit -m <сообщение>
   ```

#### Просмотр истории
```bash
git log
git log --oneline
git show <hash>
git show <path>
   ```

#### Перемещение по истории
```bash
git checkout <hash>
   ```

#### Отмена изменений до индексации (Git>=2.23.0 - 16.08.2019)
```bash
git restore <file>
  ```
Git<2.23.0
```bash
git checkout -- <file>
```


#### Отмена проиндексированных изменений (перед коммитом) (Git>=2.23.0 - 16.08.2019)
```bash
git restore --staged <file> => убирает файл из индекса, не изменяет рабочий каталог, т.е. содержимое останется прежним

git restore --staged --worktree <file> => убирает файл из индекса и изменяет рабочий каталог, т.е. содержимое файла откатывается до состояния HEAD

git restore -SW <file> => тоже самое, но коротко

Git<2.23.0
git reset HEAD <file>  => сбрасывает буферную зону к HEAD
git checkout -- <file> => reset (по умолчанию) не изменяет рабочий каталог, т.е. содержимое останется прежним
  ```

#### Просмотр веток
   "Одна фича - одна ветка.
   Один багфикс (больше двух коммитов) - одна ветка.
   Один эксперимент - одна ветка.
   Одна фича внутри эксперимента - ветка от ветки."
 ```bash
 git branch
  ```

#### Создание ветки (Git>=2.23.0 - 16.08.2019)
```bash
git switch -c <branch_name>

Git<2.23.0
git checkout -b <branch_name>
```

#### Создание ветки из master
```bash
git checkout master
git branch new-branch
git checkout new-branch
```



#### Переключение между ветками (Git>=2.23.0 - 16.08.2019)
```bash
 $ git switch <branch_name>
 $ git switch --discard-changes <branch_name> => отбросить локальные изменения
 git switch -                               => переключение на предыдущую ветку

 Git<2.23.0
 git checkout <branch_name>
 ```

#### Слияние веток
```bash
git switch <branch_name_1>
git merge <branch_name_2>
   ```

#### Удаление ветки
```bash
git branch -d <branch_name>
```

#### Создание тегов (метод) версий
```bash
git tag <tag_name>                   => Легковесная метка
git tag -a <tag_name> -m <сообщение> => Аннотированные метки
```

#### Просмотр тегов
```bash
git tag
git tag -l 'v1.*'
```

#### Удаление тега
```bash
git tag -d <tag_name>
```

#### Добавить удаленный (общий) репозиторий
```bash
git remote add origin <uri>
```

#### Отправить изменения в удаленный репозиторий
```bash
 git push -u origin <branch_name>
 ```

#### Получить изменения из удаленного репозитория
```bash
git pull origin <branch_name>
git pull origin <branch_name> --allow-unrelated-histories
```



#### Справка
```bash
git help
git <command> -h
```

#### Сравнение коммитов
```bash
git diff HEAD
```

####  Перемещение файлов
```bash
git mv <from> <to>
```

#### Удаление файлов
```bash
git rm <file>
git rm --cached <file>
   ```

#### Очистка кеша сохраненных паролей
```bash
git config --system --unset credential.helper
 ```
