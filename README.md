# Vercel Express Boilerplate

Create config.json for Database Configuration
```bash
cp config/development.config.json config/config.json
```

Create .env for Development Environment
```bash
cp dev.env .env
```

Sequelize Command
```bash
# Create Database
sequelize db:create 

# Migrate Database
sequelize db:migrate

# Seed Database
sequelize db:seed:all

# Add --env for environment selection (development, test, production)
sequelize db:create --env production
```
