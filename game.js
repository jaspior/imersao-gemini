/** ~-~-~-~-~-~-~-~-~ Obs       ~-~-~-~-~-~-~-~-~                   **/
/** Não consegui integrar 100% esses scripts com o app.js.          **
 ** A função que chama os background não funciona e provavelmente   **
 ** O mesmo aconeceria com as outras funções interativas. Mantenho  **
 ** Esses daddos aqui a título de prova de conceito. É possível,    **
 ** Mas dado o tempo e escopo da imersão, não será feito agora.     **/
/** ############################################################### **/



function carregarFundo(app) {
    // Verifica se a textura já está no cache
    const cachedTexture = PIXI.utils.TextureCache['../imgs/city.png'];

    if (cachedTexture) {
        // Se já estiver no cache, usa a textura diretamente
        backgroundSprite = new PIXI.Sprite(cachedTexture);
        inicializarBackgroundSprite(app);
    } else {
        // Carrega a textura se não estiver no cache
        PIXI.Assets.load('../imgs/city.png').then((texture) => {
            backgroundSprite = new PIXI.Sprite(texture);
            inicializarBackgroundSprite(app);
        });
    }
}

function inicializarBackgroundSprite(app) {
    // Configurações do sprite de fundo
    if (backgroundSprite) {
        backgroundSprite.anchor.set(0.5);
        backgroundSprite.x = app.screen.width / 2;
        backgroundSprite.y = app.screen.height / 2;
        backgroundSprite.width = app.screen.width;
        backgroundSprite.height = app.screen.height;
        backgroundSprite.zIndex = -10;
        backgroundSprite.visible = false;  // Mantém invisível até ser revelado

        // Adiciona o background ao stage
        app.stage.addChild(backgroundSprite);
    } else {
        console.error('backgroundSprite não foi inicializado corretamente.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new PIXI.Application({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.2, 
        transparent: true,
        backgroundAlpha: 0.2,
    });

    document.querySelector('.pixi-container').appendChild(app.view);

    app.stage.sortableChildren = true;

    let backgroundSprite = null;

    document.addEventListener('revelarBackground', () => {
        if (backgroundSprite) {
            backgroundSprite.visible = true;
        }
    });

    PIXI.Assets.load('cat.png').then((texture) => {
        texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        const characterTextures = [];
        const frameWidth = texture.width / 2; // 2 colunas
        const frameHeight = texture.height / 2; // 2 linhas

        for (let i = 0; i < 2; i++) {
            characterTextures.push([
                new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(0, i * frameHeight, frameWidth, frameHeight)),
                new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(frameWidth, i * frameHeight, frameWidth, frameHeight))
            ]);
        }

        const character = new PIXI.AnimatedSprite(characterTextures[0]);
        character.anchor.set(0.5);
        character.x = app.screen.width / 2;
        character.y = app.screen.height / 2;
        character.animationSpeed = 0.06;
        character.play();

        character.zIndex = 1;  // Garantir que o personagem fique na frente do background

        app.stage.addChild(character);

        let moving = false;
        let direction = 1; // 1 para direita, -1 para esquerda
        let moveStartTime = 0;
        let moveDuration = 0;
        let targetX = character.x;

        function startMovement() {
            moveStartTime = Date.now();
            moveDuration = 7000 + Math.random() * 12000;
            direction = Math.random() > 0.5 ? 1 : -1;
            targetX = character.x + (direction * (Math.random() * (app.screen.width / 2)));

            if (targetX < frameWidth / 2) {
                targetX = frameWidth / 2;
                direction = 1;
            } else if (targetX > app.screen.width - frameWidth / 2) {
                targetX = app.screen.width - frameWidth / 2;
                direction = -1;
            }

            moving = true;
            character.textures = characterTextures[1];
            character.play();
        }

        app.ticker.add(() => {
            if (moving) {
                const elapsedTime = Date.now() - moveStartTime;
                if (elapsedTime < moveDuration) {
                    const deltaX = targetX - character.x;
                    if (Math.abs(deltaX) > 1) {
                        character.x += deltaX * 0.004;
                        character.scale.x = direction;
                    } else {
                        moving = false;
                        character.textures = characterTextures[0];
                        character.play();
                        setTimeout(startMovement, 10000);
                    }
                } else {
                    moving = false;
                    character.textures = characterTextures[0];
                    character.play();
                    setTimeout(startMovement, 10000);
                }
            }
        });

        startMovement();
    });

    // Carrega o background passando a instância do app como parâmetro
    carregarFundo(app);
});
