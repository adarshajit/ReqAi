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
cd ReqAi/backend
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

## Run the script

By running the following shell script all the packages necessary for both the backend and frontend will be installed, the application should now be up and running!

```
. ./startup.sh
```