import AsyncStorage from '@react-native-async-storage/async-storage';
 
const CARRINHO_DE_COMPRAS = 'CARRINHO_DE_COMPRAS';
const VALORTOTAL_CARRINHO = 'VALORTOTAL_CARRINHO';
const QTDITENS_CARRINHO = 'QTDITENS_CARRINHO'
 
//função para adicionar um item no carrinho de compras
export const add = async (produto: any) => {
    try {
 
        //ler todos os itens constidos na AsyncStorage
        let json = await AsyncStorage.getItem(CARRINHO_DE_COMPRAS) as string;
        let itens = JSON.parse(json) as any[];
 
        if (itens == null) {
            itens = [];
        }
 
        //verificar se o produto adicionado já existe no carrinho de compras
        var itemJaExiste = false;
        for (var i = 0; i < itens.length; i++) {
            var item = itens[i]; //capturando cada item do carrinho
            //verificando se o item já existe no carrinho
            if (item.id == produto.id) {
                item.quantidade = item.quantidade + 1;
                itemJaExiste = true;
                break;
            }
        }
 
        //verificar se o produto adicionado não existe no carrinho de compras
        if (!itemJaExiste) {
            produto.quantidade = 1;
            itens.push(produto);
        }
 
        //calculando o valor total e a quantidade de itens
        let valorTotal = 0;
        let quantidadeItens = 0;
 
        for (var i = 0; i < itens.length; i++) {
            var item = itens[i]; //capturando cada item do carrinho
            valorTotal += item.preco * item.quantidade;
            quantidadeItens += item.quantidade;
        }
 
        //gravar na AsyncStorage
        await AsyncStorage.setItem(CARRINHO_DE_COMPRAS, JSON.stringify(itens));
        await AsyncStorage.setItem(VALORTOTAL_CARRINHO, String(valorTotal));
        await AsyncStorage.setItem(QTDITENS_CARRINHO, String(quantidadeItens));
 
        console.log('Produto adicionado com sucesso.');
    }
    catch (e) {
        console.log(e);
    }
}
 
//função para remover um item no carrinho de compras
export const remove = async (produto: any) => {
 
    try {
        //ler todos os itens constidos na AsyncStorage
        let json = await AsyncStorage.getItem(CARRINHO_DE_COMPRAS) as string;
        let itens = JSON.parse(json) as any[];
 
        //percorrer os itens
        for (var i = 0; i < itens.length; i++) {
            var item = itens[i];
            if (item.id == produto.id) {
                item.quantidade = item.quantidade - 1;
                break;
            }
        }
 
        //remover todos os itens do carrinho
        //que possuam quantidade <= 0
        const carrinho = itens.filter((i) => i.quantidade > 0);
 
        //calculando o valor total e a quantidade de itens
        let valorTotal = 0;
        let quantidadeItens = 0;
 
        for (var i = 0; i < carrinho.length; i++) {
            var item = carrinho[i]; //capturando cada item do carrinho
            valorTotal += item.preco * item.quantidade;
            quantidadeItens += item.quantidade;
        }
 
        //gravar na AsyncStorage
        await AsyncStorage.setItem(CARRINHO_DE_COMPRAS, JSON.stringify(carrinho));
        await AsyncStorage.setItem(VALORTOTAL_CARRINHO, String(valorTotal));
        await AsyncStorage.setItem(QTDITENS_CARRINHO, String(quantidadeItens));
 
        console.log('Produto removido com sucesso.');
    }
    catch (e) {
        console.log(e);
    }
}
 
//função para remover todos os itens no carrinho de compras
export const removeAll = async () => {
 
    try {
        await AsyncStorage.removeItem(CARRINHO_DE_COMPRAS);
        await AsyncStorage.setItem(VALORTOTAL_CARRINHO, String(0));
        await AsyncStorage.setItem(QTDITENS_CARRINHO, String(0));
 
        console.log('Carrinho de compras removido com sucesso.');
    }
    catch (e) {
        console.log(e);
    }
}
 
//função para retornar todos os itens no carrinho de compras
export const getAll = async () => {
 
    try {
        //ler todos os itens constidos na AsyncStorage
        let json = await AsyncStorage.getItem(CARRINHO_DE_COMPRAS) as string;
        return JSON.parse(json) as any[];
    }
    catch (e) {
        console.log(e);
    }
}
 
//função para retornar o valor total do carrinho
export const getValorTotal = async () => {
 
    try {
        return await AsyncStorage.getItem(VALORTOTAL_CARRINHO) as string;
    }
    catch (e) {
        console.log(e);
    }
}
 
//função para retornar a quantidade de itens do carrinho
export const getQtdItens = async () => {
 
    try {
        return await AsyncStorage.getItem(QTDITENS_CARRINHO) as string;
    }
    catch (e) {
        console.log(e);
    }
}

