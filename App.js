import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

let time1;
let time2;
let time3;
let time4;
let time5;
let time6;
const initialState = {
  tipo: 'CPU-Bound',
  iniciado: false,
  espera: [],
  pronto: [],
  execucao: [],
}

export default class App extends React.Component {

  state = { ...initialState }

  iniciarCPU = () => {
    this.setState({ iniciado: true }, () => {
      const processo = { id: 0, backgroundColor: '#4B4BFF' }
      this.setState({ pronto: [processo], execucao: [], espera: [] })
      time2 = setTimeout(() => { this.setState({ execucao: [processo], pronto: [] }) }, 3000)
      time1 = setTimeout(this.iniciarCPU, 5000)
    })
  }

  iniciarIO = () => {
    this.setState({ iniciado: true }, () => {
      const processo1 = { id: 0, backgroundColor: '#4B4BFF' }
      const processo2 = { id: 1, backgroundColor: '#4B4B' }
      //realize para mim que o processo1 va para primeiro em espera, depois de um segundo em pronto e depois de mais um segundo em execucao, e apos tudo isso fazer tudo de novo
      // Processo1 e Processo2 vão para "espera"
      this.setState({ espera: [processo1, processo2], pronto: [], execucao: [] })

      // Após 1 segundo, Processo1 vai para "pronto" e Processo2 permanece em "espera"
      time1 =setTimeout(() => {
        this.setState({ pronto: [processo1], espera: [processo2] })

        // Após mais 1 segundo, Processo1 vai para "execução" e Processo2 vai para "pronto"
        time2 = setTimeout(() => {
          this.setState({ execucao: [processo1], pronto: [], espera: [processo2] })

          // Após mais 1 segundo, Processo1 vai para "espera" e Processo2 vai para "execução"
          time3 = setTimeout(() => {
            this.setState({ execucao: [], pronto: [], espera: [processo1, processo2] })

            // Após mais 1 segundo, Processo2 vai para "espera" e Processo1 vai para "pronto"
           time4 = setTimeout(() => {
              this.setState({ pronto: [processo2], espera: [processo1], execucao: [] })

              // Após mais 1 segundo, Processo1 vai para "execução" e Processo2 permanece em "espera"
             time5 = setTimeout(() => {
                this.setState({ execucao: [processo2], pronto: [], espera: [processo1] })

                // Após mais 1 segundo, ambos os processos voltam para "espera" e o ciclo reinicia
                time6 = setTimeout(this.iniciarIO, 1000)
              }, 1000)
            }, 1000)
          }, 1000)
        }, 1000)
      }, 1000)









    })
  }

  render = () => {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.titulo, { fontSize: 30 }]}>Simulador</Text>
          <Text style={{ textAlign: 'center' }}>Paulo Sergio Dias</Text>
          <Text style={{ textAlign: 'center' }}>Gianlucca Paschetta</Text>

          <TouchableOpacity onPress={() => {
            if (this.state.tipo == 'CPU-Bound') {
              this.state.iniciado ? this.setState({ ...initialState }, () => {
                clearTimeout(time1)
                clearTimeout(time2)
              }) : this.iniciarCPU()
            } else {
              this.state.iniciado ? this.setState({ ...initialState, tipo: 'I/O Bound' }, () => {
                clearTimeout(time1)
                clearTimeout(time2)
                clearTimeout(time3)
                clearTimeout(time4)
                clearTimeout(time5)
                clearTimeout(time6)

              }) : this.iniciarIO()
            }
          }}>
            <View style={[styles.buttonIniciar, this.state.iniciado ? { backgroundColor: '#FF4B4B' } : null]}>
              {this.state.iniciado ? <AntDesign name="pause" size={24} color="white" /> : <AntDesign name="caretright" size={24} color="white" />}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.simulador}>
          <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.setState({ tipo: 'CPU-Bound' })}>
              <View style={[styles.button, this.state.tipo == 'CPU-Bound' ? { backgroundColor: '#aaf' } : null]}>
                <Text style={styles.textButton}>CPU-Bound</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ tipo: 'I/O Bound' })}>
              <View style={[styles.button, this.state.tipo == 'I/O Bound' ? { backgroundColor: '#aaf' } : null]}>
                <Text style={styles.textButton}>I/O Bound</Text>
              </View>
            </TouchableOpacity>

          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.titulo}>Espera</Text>
            <FlatList
              data={this.state.espera}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={[styles.processo, { backgroundColor: item.backgroundColor }]}></View>
              )} />
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.titulo}>Pronto</Text>
            <FlatList
              data={this.state.pronto}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={[styles.processo, { backgroundColor: item.backgroundColor }]}></View>
              )} />
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.titulo}>Execução</Text>
            <FlatList
              data={this.state.execucao}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={[styles.processo, { backgroundColor: item.backgroundColor }]}></View>
              )} />
          </View>
        </View>


      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  simulador: {
    flex: 4,
    width: '90%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
  },
  button: {
    matgintTop: 10,
    width: 200,
    height: 50,
    backgroundColor: '#e1e1e1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  buttonIniciar: {
    marginVertical: 10,
    width: 50,
    height: 50,
    backgroundColor: '#0FFF3C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
  },
  processo: { width: 50, height: 50, margin: 5, borderRadius: 50, elevation: 10, shadowColor: '#000' }
});
