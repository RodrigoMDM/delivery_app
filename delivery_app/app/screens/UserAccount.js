import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, View, Text, Alert } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import Header from "../components/Header";
import * as validations from '../validations/user-account.validation';
import * as services from '../services/user-services';
 
export default function UserAccount({ navigation }) {
 
    const [erroSenhaConfirmacao, setErroSenhaConfirmacao] = useState('');
 
    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();
 
    const onSubmit = (data) => {
 
        if (data.senha != data.senhaConfirmacao) {
            setErroSenhaConfirmacao('Senhas não conferem, por favor verifique.');
        }
        else {
 
            services.postCliente(data)
                .then(
                    result => {
                        reset({ nome: '', email: '', telefone: '', senha: '', senhaConfirmacao: '' })
                        Alert.alert('Parabéns!', result.message);
                    }
                )
                .catch(
                    e => {
                        console.log(e.response);
                        Alert.alert('Falha!', e.response.data.message);
                    }
                )
 
        }
    }
 
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <Header navigation={navigation} />
            <Card style={{ backgroundColor: '#fafafa' }}>
                <Card.Title
                    title="Cadastre sua Conta de Cliente"
                    subtitle="Informe seus dados para criar sua conta."
                    titleStyle={{
                        fontSize: 14
                    }}
                />
            </Card>
 
            <Card>
                <Card.Content>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Informe seu Nome:</Text>
                        <Controller
                            control={control}
                            name="nome"
                            defaultValue=''
                            rules={{ validate: validations.nomeValidation }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Informe seu nome aqui"
                                        keyboardType="default"
                                        autoComplete="name"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />
 
                        {
                            errors.nome && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.nome.message}
                            </Text>
                        }
 
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Telefone:</Text>
                        <Controller
                            control={control}
                            name="telefone"
                            defaultValue=''
                            rules={{ validate: validations.telefoneValidation }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Informe seu telefone aqui"
                                        keyboardType="phone-pad"
                                        autoComplete="tel"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />
 
                        {
                            errors.telefone && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.telefone.message}
                            </Text>
                        }
 
 
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Email de Acesso:</Text>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue=''
                            rules={{ validate: validations.emailValidation }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Informe seu email aqui"
                                        keyboardType="default"
                                        autoComplete="name"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />
 
                        {
                            errors.email && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.email.message}
                            </Text>
                        }
 
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Senha de Acesso:</Text>
                        <Controller
                            control={control}
                            name="senha"
                            defaultValue=''
                            rules={{ validate: validations.senhaValidation }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Informe sua senha aqui"
                                        keyboardType="default"
                                        secureTextEntry={true}
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />
 
                        {
                            errors.senha && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.senha.message}
                            </Text>
                        }
 
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Confirme sua Senha de Acesso:</Text>
                        <Controller
                            control={control}
                            name="senhaConfirmacao"
                            defaultValue=''
                            rules={{ validate: validations.senhaConfirmacaoValidation }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Confirme sua senha aqui"
                                        keyboardType="default"
                                        secureTextEntry={true}
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />
 
                        {
                            errors.senhaConfirmacao && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.senhaConfirmacao.message}
                            </Text>
                        }
 
                        <Text>
                            {
                                erroSenhaConfirmacao && <Text style={{
                                    fontSize: 15,
                                    color: '#BB2124'
                                }}>
                                    {erroSenhaConfirmacao}
                                </Text>
                            }
                        </Text>
 
                    </View>
 
                    <View style={{ marginBottom: 20 }}>
                        <Button style={{ fontWeight: 'bold' }}
                            mode="contained"
                            icon="account-circle"
                            onPress={handleSubmit(onSubmit)}
                        >
                            Realizar Cadastro
                        </Button>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Button style={{ fontWeight: 'bold' }}
                            mode="outlined"
                            icon="check-circle"
                            onPress={() => navigation.navigate('user-login')}
                        >
                            Acessar Conta de Cliente.
                        </Button>
                    </View>
                </Card.Content>
            </Card>
 
        </ScrollView>
    )
}


