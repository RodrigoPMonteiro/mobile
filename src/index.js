import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

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
                    <View style={styles.projectContainer}>
                        <Text style={styles.project}>
                                {project.title}
                        </Text>
                        <TouchableOpacity
                            style={styles.buttonDelete}
                            onPress={() => handleRemoveProject(project.id)}
                            testID={`like-button-${project.id}`}
                        >
                            <Text style={styles.buttonTextDel}>Apagar arquivo</Text>
                        </TouchableOpacity>
                    </View>
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
        color: 'black',
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

    buttonDelete: {
        backgroundColor: 'purple',
        margin:20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonTextDel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    },

    title: {
        flexDirection: "row",
        marginTop: 10,
      },
      projectContainer: {
        marginBottom: 15,
        marginHorizontal: 15,
        backgroundColor: "#fff",
        padding: 20,
      },
});