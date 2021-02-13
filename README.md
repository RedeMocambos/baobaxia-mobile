# Baobaxia Mobile

ATENÇÃO: A mucua Luiza Mahin é a mucua do projeto herbert de souza, não envie conteudos para a mucua, ele não um ambiente de teste. Um ambiente de teste para o app deve ser definido no futuro, provavelmente na maquina <https://toussaint.taina.net.br/> que hoje esta fora do ar.

> O projeto mobile para o baobaxia é um app que esta usando como referencia a mucua do projeto herbert de souza <https://luizamahin.mocambos.net/> que possui um conjunto de videos voltados aos estudantes de cursinho pré vestibular. No entanto existem diversas outras mucuas em diversas comunidades e aos poucos o sistema vai se adaptar conectar com qualquer mucua e fazer operações como exibir um video e tocar um audio, apresentar um PDF, um texto, realizar o login de usuário, subir um video ou audio gravado no celular, deixar anotações no app sobre um video (não sincronizadas para a mucua e apenas de uso pessoal).

![Primeiro print do app mostrando um grid da página inicial contendo 2 videos aulas do professor de literatura Nicolas Claro](doc/prints/print-baobaxia-alpha.png)

## Compilando e instalando o projeto no simulador

Este é um conjunto de comando básicos para o desenvolvimento do app, note que este app é criado usando cordova e vue, básicamente pegamos o SPA gerando pelo vue e colocamos na pasta www do cordova, em seguida geramos um projeto para android ou ios e instalamos em um simulador para teste.

Atualmente o projeto não esta em nenhuma loja (apple store ou play store ou mesmo algum outro site que faça a distrinuição de apps livres). Sendo assim isso é um ponto em aberto e aceitamos sugestões. Siga estes comandos para conseguir rodar em sua maquina.

``` bash
# instalando as dependencias do projeto
npm install

# fazendo o build do projeto na pasta www
npm run build

# adicionando uma plataforma, nesta caso android

cordova platform add android 

# fazendo o build do apk android para debug
cordova build android

# rodando o projeto no simulador (este passo já faz o build)
cordova run android

# comando que facilita sua vida

npm run build; cordova run android

```

## Comando uteis

Aqui vamos alimentar com alguns comandos uteis para quem esta começando no projeto.

```bash

# lista os plugins instalados
cordova plugin list

```

## Plugins que utilizamos

Olhando no arquivo package.json você pode ver uma lista dos plugins, por hora o projeto esta no começo e estamos usando apenas o plugin advanced-http  e o plugin de whitelist. O primeiro permite fazer requisições http nativas, via sistema operacional, nós usamos ele pois evita problemas com CORS, que atualmente é um problema ou uma proteção para acessar a API do projeto, e usamos o whitelist para definir os sites que são acessados pelo aplicativo.

```JSON
    "plugins": {
      "cordova-plugin-advanced-http": {},
      "cordova-plugin-whitelist": {}
    }
```

## UI - vuetify

Nos estamos usando o vuetify para o desenvolvimento de toda a interface gráfica. Veja a documentação dele em <https://vuetifyjs.com/en/> existem vários componentes sempre tente usar um componente antes de tentar criar algo do zero.

## Testando suas melhorias no navegador

Você vai notar que não é possivel fazer uma requisição as mucuas usando um navegador por conta do bloqueio de [CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Controle_Acesso_CORS) porém é possivel ainda assim fazer algumas melhorias usando o navegador, escolha a tela que vc vai trabalhar siga ate o arquivo `src/router/index.js` e e modifique a sua página para que ela seja `/` (raiz) ao invés da página de login agora sempre que o app carregar você vai cair na página que você esta desenvolvendo oe estilo ou integrando um componente, isso pode ajudar a agilizar o processo de desenvolvimento.

Para finalizar para você conseguir mostrar a página no navegador vá ate o console e rode o comando `npm run dev` vai ser iniciado um servidor local e você deve conseguir acessar ele em localhost:8080, veja no console qual foi o endereço e porta que o comando definil. Você pode modificar os arquivos e olhar no navegador pois a cada modificação a página e o servidor local são recarregados.

```js
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/grid',
      name: 'Grid',
      component: Grid
    }
  ]
})
```
