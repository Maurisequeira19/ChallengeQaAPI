describe('API Test Challenge', () => {
  const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
  const appId = 'd5510b12865fd2969c5851d3628edab6';

  it('Solicitar temperatura y ciudad', () => {
    const lat = '-31.41';
    const lon = '-64.18';

    cy.request({
      method: 'GET',
      url: `${endpoint}?lat=${lat}&lon=${lon}&appid=${appId}`,
    }).then((response) => {
      expect(response.status).to.eq(200); // Verifica que el código de estado sea 200
      cy.log(JSON.stringify(response.body)); // Muestra el cuerpo de la respuesta en logs
      
      
     
      const temp = response.body.main.temp
      expect(temp).to.be.a('number') // Verificar que sea un numero
      expect(temp).to.not.be.null // Verificar que traiga valor no nulo en temp

      
      const name = response.body.name
      expect(name).to.be.a('string') // Verificar que sea un string
      expect(name.length).to.be.greaterThan(0); // Asegurar que no esté vacío

      // Realizamos el POST en otra api de practica "jsonplaceholder"
      const postData = {
        title: name, // Guardamos "name" como "title"
        body: temp,  // Guardamos "temp" como "body"
        userId: 1,   
      };

      cy.request({
        method: 'POST',
        url: 'https://jsonplaceholder.typicode.com/posts',
        body: postData,  // Enviamos los datos
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }).then((postResponse) => {
        expect(postResponse.status).to.eq(201); // Verificar que la respuesta sea exitosa
        cy.log('Datos guardados correctamente: ' + JSON.stringify(postResponse.body));
      });
      
    });
  });
});
