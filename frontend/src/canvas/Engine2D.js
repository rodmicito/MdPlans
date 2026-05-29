import { Application, Container, Graphics, Text, TextStyle } from 'pixi.js';

export class Engine2D {
  constructor(containerElement) {
    this.container = containerElement;
    this.app = new Application();
    this.isInitialized = false;
    this.destroyed = false;
    this.resizeHandler = this.handleResize.bind(this);
  }

  async init() {
    // Inicialización asíncrona (PixiJS v8)
    await this.app.init({
      resizeTo: this.container,
      backgroundColor: 0x0B1120, // Match de Tailwind bg-[#0B1120]
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      antialias: true
    });
    
    // Si React desmontó el componente mientras esperábamos a init(),
    // debemos destruir la app de Pixi de forma segura AHORA que ya se inicializó.
    if (this.destroyed) {
       this.app.destroy({ removeView: true, children: true });
       return;
    }

    this.container.appendChild(this.app.canvas);
    this.isInitialized = true;

    // Contenedor principal de la línea de tiempo
    this.timelineContainer = new Container();
    this.app.stage.addChild(this.timelineContainer);

    this.renderInitialState();
    
    // Resize listener
    window.addEventListener('resize', this.resizeHandler);
  }

  handleResize() {
    if (this.isInitialized && !this.destroyed) {
       this.app.resize();
    }
  }

  renderInitialState() {
    // Definición de colores semánticos
    const colors = {
      completed: 0x22C55E, // Verde
      inProgress: 0x06B6D4, // Cyan
      pending: 0x4F6BFF, // Azul
      delayed: 0xEF4444 // Rojo
    };

    // 1. Dibujar Grilla (Líneas divisorias suaves)
    const gridGraphics = new Graphics();
    gridGraphics.setStrokeStyle({ width: 1, color: 0x1E293B, alpha: 0.8 });
    
    // Simulando columnas de meses
    const colWidth = this.app.screen.width / 6;
    for (let i = 1; i < 6; i++) {
       const x = i * colWidth;
       gridGraphics.moveTo(x, 0);
       gridGraphics.lineTo(x, this.app.screen.height);
    }
    this.timelineContainer.addChild(gridGraphics);

    // 2. Tareas Simuladas (Mock Data)
    const tasks = [
      { name: "Movimiento de Tierras", x: 20, y: 30, width: colWidth * 1.2, height: 24, status: 'completed' },
      { name: "Cimentación y Bases", x: colWidth * 0.8, y: 70, width: colWidth * 1.5, height: 24, status: 'inProgress' },
      { name: "Estructura Principal", x: colWidth * 2.5, y: 110, width: colWidth * 1.8, height: 24, status: 'pending' },
      { name: "Encofrado de Losas", x: colWidth * 1.9, y: 150, width: colWidth * 0.9, height: 24, status: 'delayed' }
    ];

    // Contenedor de Tareas
    this.tasksContainer = new Container();
    this.timelineContainer.addChild(this.tasksContainer);

    tasks.forEach(task => {
      const taskGroup = new Container();
      const color = colors[task.status];
      
      // Barra de Tarea
      const taskGraphics = new Graphics();
      taskGraphics.roundRect(0, 0, task.width, task.height, 4);
      taskGraphics.fill({ color: color, alpha: 0.15 });
      taskGraphics.stroke({ width: 1, color: color, alpha: 0.8 });
      
      // Texto de Tarea
      const textStyle = new TextStyle({
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 10,
          fill: color,
          fontWeight: '600'
      });
      const text = new Text({ text: task.name, style: textStyle });
      text.x = 10;
      text.y = 5;

      taskGroup.addChild(taskGraphics);
      taskGroup.addChild(text);
      
      // Posicionar el grupo
      taskGroup.x = task.x;
      taskGroup.y = task.y;

      this.tasksContainer.addChild(taskGroup);
    });

    // 3. Marcador de "HOY"
    const markerX = colWidth * 3.5; // Simulado en "Junio"
    
    this.markerGraphics = new Graphics();
    this.markerGraphics.setStrokeStyle({ width: 1, color: 0xEF4444, alpha: 1 });
    // Línea punteada simulada
    for (let i = 0; i < this.app.screen.height; i += 6) {
       this.markerGraphics.moveTo(markerX, i);
       this.markerGraphics.lineTo(markerX, i + 3);
    }
    this.markerGraphics.stroke();
    
    const markerTextBg = new Graphics();
    markerTextBg.rect(markerX - 15, 0, 30, 14);
    markerTextBg.fill(0xEF4444);

    const markerText = new Text({
        text: "HOY", 
        style: new TextStyle({
            fontFamily: 'system-ui, sans-serif',
            fontSize: 9,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            letterSpacing: 1
        })
    });
    markerText.x = markerX - 11;
    markerText.y = 1;

    this.timelineContainer.addChild(this.markerGraphics);
    this.timelineContainer.addChild(markerTextBg);
    this.timelineContainer.addChild(markerText);
  }

  updateFromStore(projectData) {
    if (!this.isInitialized || this.destroyed) return;
    
    console.log("PixiJS Engine2D: Recibido tick del motor temporal", projectData);
    
    if (this.markerGraphics) {
      this.markerGraphics.alpha = 0.5;
      setTimeout(() => { 
        if (!this.destroyed && this.markerGraphics) {
          this.markerGraphics.alpha = 1; 
        }
      }, 200);
    }
  }

  destroy() {
    this.destroyed = true;
    window.removeEventListener('resize', this.resizeHandler);
    
    // Solo destruimos si la app de PixiJS ya terminó su init asíncrono
    // Si no ha terminado, el aborto se manejará al final de init()
    if (this.app && this.isInitialized) {
       this.app.destroy({ removeView: true, children: true });
    }
  }
}
