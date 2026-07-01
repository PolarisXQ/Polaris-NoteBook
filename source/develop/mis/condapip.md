# Use Conda and Pip to Manage Your Python Environments

## Exporting and Sharing Your Environment

```bash
# conda 
conda env export > environment.yml

# pip
pip freeze > requirements.txt
```

## Importing an Environment

```bash
# conda
conda env create -f environment.yml

# pip
pip install -r requirements.txt
```

## Update Dependencies

```bash
# conda
conda env update -f environment.yml -n myenv

# pip
pip install -r requirements.txt
```


