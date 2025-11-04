class Cliente {
    private nome:String;
    private idade:number;

    constructor(nome: String, idade:number) {
        this.nome = nome;
        this.idade = idade;
    }

    public getNome():String {
        return this.nome;
    }

    public setNome(nome:String):void {
        this.nome = nome;
    }

    public getIdade():number {
        return this.idade;
    }

    public setIdade(idade:number):void {
        this.idade = idade;
    }
}

class Livro {
    private id:number;
    private nome:String;
    private autor:String;
    private disponivel:boolean;

    constructor(id:number, nome:String, autor:String) {
        this.id = id;
        this.nome = nome;
        this.autor = autor;
        this.disponivel = true;
    }

    public getId():number {
        return this.id;
    }

    public setId(id:number):void {
        this.id = id;
    }
    
    public getNome():String {
        return this.nome;
    } 

    public setNome(nome:String):void {
        this.nome = nome;
    }

    public getAutor():String {
        return this.nome;
    }

    public setAutor(autor:String):void {
        this.autor = autor;
    }

    public getDisponivel():boolean {
        return this.disponivel;
    } 
    public setDisponivel(disponivel:boolean):void {
        this.disponivel = disponivel;
    }
}

class Biblioteca {
    private livros: Livro[];

    constructor() {
        this.livros = [];
    }

    public addLivro(livro:Livro):void {
        this.livros.push(livro);
    }

    public removerLivro(id:number):void {
        this.livros.filter(livro => livro.getId() !== id);
    }

    public getLivros():Livro[] {
        return this.livros;
    }

    public async getLivro(id:number):Promise<Livro> {
        const myPromise = new Promise<Livro> ((resolve, reject) => {
            setTimeout(() => {
                const livro = this.livros.find(livro => livro.getId() === id);
                if(livro) {
                    resolve(livro);
                }
                reject("Livro não encontrado.");
                return;
            },3000)
        })
        return myPromise;
    }

    public async emprestarLivro(livro:Livro, cliente:Cliente):Promise<void> {
    const myPromise = new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            if (!livro.getDisponivel()) {
                reject("Este livro já está emprestado!");
                return;
            }

            livro.setDisponivel(false);       
            console.log(`Livro "${livro.getNome()}" emprestado para ${cliente.getNome()}`);
            resolve();
        },3000)
    });
    return myPromise;
}

public async devolverLivro(livro:Livro):Promise<void> {
    const myPromise = new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            if (livro.getDisponivel()) {
                reject("Este livro já está disponível na biblioteca!");
                return;
            }

            livro.setDisponivel(true);
            console.log(`Livro "${livro.getNome()}" foi devolvido`);
            resolve();
        },3000)
    });

    return myPromise;
}
}

async function main() {
    console.log("Iniciando sistema de biblioteca...");
    try {
        const biblioteca = new Biblioteca();
        const c1 = new Cliente("Carlos",19);
        const c2 = new Cliente("Maria",25);

        const l1 = new Livro(1, "O Senhor dos Anéis", "Tolkien");
        const l2 = new Livro(2, "Harry Potter", "J.K. Rowling");
        const l3 = new Livro(3, "Dom Casmurro", "Machado de Assis");

        biblioteca.addLivro(l1);
        biblioteca.addLivro(l2);
        biblioteca.addLivro(l3);

        console.log("Tentando emprestar...");
        await biblioteca.emprestarLivro(l1, c1).catch(e => console.log(e));
        await biblioteca.emprestarLivro(l2, c2).catch(e => console.log(e));

        console.log("Devolvendo livro...");
        await biblioteca.devolverLivro(l1);
        await biblioteca.devolverLivro(l2);

    } catch (Error) {
        console.error("Erro:", Error);
    }
    console.log("Finalizando sistema...");
}
main();
