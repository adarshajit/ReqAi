# ReqAi

## How to setup project

Check whether `python3` installed

```
python3 --version
```

if not go ahead and install `python3`

```
sudo apt --only-upgrade install python3
```

clone the repository using https / ssh

https:

```
git clone https://github.com/adarshajit/ReqAi.git
```

ssh:

```
git clone git@github.com:adarshajit/ReqAi.git
```

Go to project folder

```
cd ReqAi
```

Install virtual environment

```
python3 -m venv .venv
```

Activate the environment

```
 . .venv/bin/activate
```

Install Flask

```
pip install Flask
```

Run the flask server

```
flask --app <filename> run
```

Example: if our file name is `hello.py`

Then the command will look something like this:

```
flask --app hello run
```

Exit virtual environment

```
deactivate
```

For further info refer the official docs: https://flask.palletsprojects.com/en/2.3.x/
