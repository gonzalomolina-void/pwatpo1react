# Guía de GitHub CLI (`gh`) para Windows

Este documento sirve como referencia rápida para instalar y configurar la herramienta `gh` en este proyecto.

## 1. Instalación
Si aún no la tienes, ejecuta este comando en una terminal (PowerShell o CMD):
```powershell
winget install --id GitHub.cli
```
*Nota: Es necesario reiniciar VS Code o la terminal después de la instalación para que el sistema reconozca el comando `gh`.*

## 2. Autenticación Inicial
Para vincular tu cuenta principal:
```powershell
gh auth login
```
*   **What account do you want to log into?** GitHub.com
*   **What is your preferred protocol for Git operations?** HTTPS
*   **Authenticate Git with your GitHub credentials?** Yes
*   **How would you like to authenticate GitHub CLI?** Login with a web browser

## 3. Manejo de Múltiples Cuentas (hjagar / gonzalomolina-void)
GitHub CLI permite gestionar varias sesiones simultáneamente.

### Agregar otra cuenta
Si ya tienes una sesión iniciada y quieres agregar la segunda (ej. `gonzalomolina-void`):
```powershell
gh auth login
```
Sigue el mismo proceso anterior. No sobrescribirá la primera, sino que la añadirá a la lista de sesiones.

### Ver estado de cuentas
Para ver qué cuentas están registradas y cuál es la activa:
```powershell
gh auth status
```

### Cambiar de cuenta (Switch)
Para alternar entre `hjagar` y `gonzalomolina-void` según el repositorio en el que trabajes:
```powershell
gh auth switch
```
Esto te mostrará una lista interactiva para seleccionar la cuenta deseada.

## 4. Próximos Pasos en este Proyecto
Una vez que `gh auth status` muestre que estás logueado como **gonzalomolina-void**, avísame para que yo ejecute la creación automática de los Issues basados en `docs/planning.md`.
