class Restaurant {
    constructor(name) {
        this.id =  Math.floor(Math.random() * (1000000000 - 1 + 1) ) + 1;
        this.name = name
        this.menu = []
        this.contact = "0000-0000"
        this.pendingRequests = []
        this.acceptedRequests = []
    }

    changeContact(newContact) {
        this.contact = newContact
    }

    createProduct(name, cost) {
        var newProduct = new Product(name, cost, this)
        this.addProductToMenu(newProduct)
    }

    addProductToMenu(product) {
        this.menu.push(product)
    }

    showPendingRequests() {
        console.log("Pedidos pendentes (não aceitos) do restaurante " + this.name + ":")
        this.pendingRequests.forEach((request) => request.show());
    }

    showAcceptedRequests() {
        console.log(this.pedidosAceitos)
    }

    acceptRequest(request) {
        var id = request.id

        if (this.pendingRequests.find(request)) {

            console.log("pedido pendente achado. Agora faz o código pra ser aceito")
        }

    }

    showMenu() {

        console.log("Cardápio do restaurante " + this.name + ":")
        this.menu.forEach((product) => console.log("    > Nome: " + product.name + " | custo: " + this.cost)
    )
    }

    
    
}

class Product {
    constructor(name, cost, createdBy) {
        this.name = name
        this.cost = cost
        this.createdBy = createdBy
    }

}

class Request {
    constructor(client, restaurant, products, notes) {
        this.id =  Math.floor(Math.random() * (1000000000 - 1 + 1) ) + 1;
        this.products = products 
        this.requestDate = new Date()
        this.status = "Pending"
        this.notes = notes
        

        this.client = client
        this.restaurant = restaurant

        // Quando um pedido é criado, ele fica no status de pendente
        // O pedido fica na array de pedidos pendentes do restaurante
        // E também na array de pedidos do objeto do cliente

        restaurant.pendingRequests.push(this)
        client.requests.push(this)
    }

    show() {
        console.log("   > Pedido de id: " + this.id + ". Requisitado por " + this.client.name + " ao restaurante " + this.restaurant.name + ". (" + this.status + ")")
        this.products.forEach((product) => {console.log("        > " + product.name)})
    }
}

class Client {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.requests = []
    }

    makeRequest(restaurant, products, notes) {
         var newRequest = new Request(this, restaurant, products, notes)
         return newRequest
    }
    
}


var pitombeira = new Restaurant("Bar do pitombeira")
pitombeira.createProduct("arroz", 10)
pitombeira.createProduct("feijao", 5)


var eu = new Client(1, "eu")

pitombeira.showMenu()

var meuPedido = eu.makeRequest(pitombeira, [pitombeira.menu[0]], "feijao de lado")

pitombeira.showPendingRequests()
