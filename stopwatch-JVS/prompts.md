Para este ejercicio utilice una combinación de técnicas:

| Tecnica                   | Objetivo                       |
| ------------------------- | ------------------------------ |
| **Role Prompting**        | Especifica el rol y expertise. |
| **Instruction Prompting** | Objetivos y tareas claras.     |

Use el leguaje markdown para definir la estructura del prompt con el contexto, objetivo, archivos de entrada, y detalle de los archivos que se esperan como resultado.
El primer prompt creo la funcionalidad básica descrita y use un segundo prompt para agregar la opción de eliminar cronómetros y temporizadores. y un tercer prompt para ajustar y refinar funcionalidades de notificación de sonido y notificación visual.
A continuación los prompts utilizados en secuencia:

---
Primer prompt:
## **Context**

You are a **Senior Fullstack Developer** with strong expertise in **frontend technologies**, including **JavaScript, HTML, and CSS**. You are comfortable building interactive UI components and applying modern design principles.
##  **Goal**

Develop a **web-based stopwatch and timer application** with the following features:

1. **Stopwatch Functionality**:
    - Start, pause, and reset capabilities.
    - Support for multiple stopwatches running in parallel.
2. **Timer Functionality**:
    - User can set a countdown time.
    - When the timer reaches zero:
        - Play a **sound notification**.
        - Show a **visual alert** (e.g., flashing border, modal, or animation).
    - Support for multiple timers running in parallel.
## **Input Files**

You are provided with the following base HTML file:
index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timer and Countdown</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1>Timer and Countdown</h1>
<script src="script.js"></script>
</body>
</html>
```
## **Output**
1. **JavaScript (`script.js`)**:
    - Implement stopwatch and timer logic.
    - Handle multiple instances.
    - Trigger sound and visual alerts when timers complete.
2. **CSS (`styles.css`)**:
    - Apply a **modern, minimalist design**.
    - Use clean typography, spacing, and layout.
    - Reference the attached image for visual inspiration.

---
Segundo prompt:
## **New Feature Request**
- Add the ability to **close (remove) individual stopwatch and timer instances** from the UI.
### **Requirements**:
- Each stopwatch and timer instance should have a **"Close" or "Delete" button**.
- When clicked:
    - The corresponding instance should be **removed from the DOM**.
    - Any running intervals or timeouts should be **cleared** to prevent memory leaks.
- Ensure the UI updates smoothly and maintains a clean layout after removal.
---
Tercer prompt:
## **New Feature Request**
- Enhance the **timer functionality** to include a **"Stop" button** that becomes available **only when the countdown reaches zero**.
### **Behavior**:
- When the timer reaches zero:
    - A **sound notification** begins playing.
    - A **visual alert** is triggered (e.g., flashing border or modal).
    - A **"Stop" button** appears for that timer instance.
### **Requirements**:
- Each timer instance must include a **"Stop" button** that:
    - Is **hidden or disabled** until the timer completes.
    - When clicked:
        - **Stops the sound notification**.
        - **Removes or stops the visual alert**.
        - Optionally, **removes the "Stop" button** or disables it again.
