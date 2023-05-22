import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import AddTask from './components/AddTask.js';
import TaskItem from './components/TaskItem.js';

export default function App() {

  const [showModal, setShowModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  function showModalHandler() {
    setShowModal(true);
  }
  function hideModalHandler() {
    setShowModal(false);
  }
  function addNewTask(newTask) {
    setTaskList((currentTaskList) =>
      [
        ...currentTaskList,
        { text: newTask, id: Math.random().toString() }
      ]
    );
    hideModalHandler();
  }

  function deleteTask(id) {
    setTaskList((currentTaskList) => {
      return currentTaskList.filter((task) => task.id !== id) 
    })
  }

  return (
    <View style={styles.mainContainer}>
       <Image style={styles.imageStyle} source={require('../reactnativebasis/assets/task2.png')} />
      <Button title='Add New Task' color={'#333333'} onPress={showModalHandler} />
      <AddTask addNewTask={addNewTask} visible={showModal} hideModal={hideModalHandler} />
      <View style={styles.taskListSection}>
        {taskList.length > 0 ? <Text style={styles.taskOverviewTitle}>Your Tasks!</Text> :
          <Text></Text>}
        <FlatList
          data={taskList}
          renderItem={({ item, index }) => {
            return <TaskItem item={item} index={index} onDeleteTask={deleteTask} />
          }}
          keyExtractor={(item, index) => {
            return item.id
          }}
        />
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 15,
    backgroundColor: "#cccccc"
  },
  taskListSection: {
    flex: 6
  },
  taskOverviewTitle: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  imageStyle: {
    width: 300,
    height: 300,
    margin: 20
}
});