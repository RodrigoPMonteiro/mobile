import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        api.get('projects').then( response => {
            console.log(response.data)
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Rodrigo Monteiro'
        });

        const project = response.data;

        setProjects([...projects , project ]);
    };

    async function handleRemoveProject(id) {
        /* Utilizando a api importada, podemos deletar exatamente o repositorio 
           cujo id será informado por parâmetro */
        await api.delete(`projects/${id}`);
        /* Respeitando a imutabilidade, é possivel deletar valores do array "repositories" */
        setProjects(projects.filter(project => project.id !==id));
      }

      return (
        <>
           <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
           <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.project}>
                            {project.title}
                        </Text>
                    )}
                >
                </FlatList>
                <TouchableOpacity 
                    activeOpacity={0.6} 
                    style={styles.button}
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>Adicionar Projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>          
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1'
    },
    project: {
        color: '#FFF',
        fontSize:20,
        fontWeight :'bold'
    },

    button: {
        backgroundColor: '#FFF',
        margin:20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }


});