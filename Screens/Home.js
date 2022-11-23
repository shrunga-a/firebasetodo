import React,{useState,useEffect} from 'react'
import {View,Text, FlatList,StyleSheet,TextInput,TouchableOpacity, Keyboard,Pressable} from 'react-native'
import { firebase } from '../config'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const [todos,settodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData,setAddData] = useState('');
    const  navigation = useNavigation();

    //Reading the data from firebase
    useEffect(() => {
        todoRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot => {
                const todos = []
                querySnapshot.forEach((doc) => {
                    const {heading} = doc.data()
                    todos.push({
                        id: doc.id,
                        heading,

                    })
                })
                settodos(todos)
            }
        )


    },[])

   // console.log(addData)

    //deleting the data from firebase

    const deleteTodo = (todos) =>{
        todoRef
        .doc(todos.id)
        .delete()
        .then(()=>{
            //if deleting done then showing the msg
            alert('Deleted Successfully!',)

        })
        .catch(error =>{
            alert(error);
        })
    }

    //adding the todo to the list
    const addTodo = () =>{
        //checking if the data is there are not
        if(addData && addData.length > 0){
            //getting the time of creating the todos
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp
            };
            todoRef
            .add(data)
            .then(()=>{
                setAddData('');
                // release Keyboard
                Keyboard.dismiss();

            })
            .catch((error)=>{
                alert(error);
            })

        


        }

    }
       


  return (
 <View style={{flex:1}}>
 <View style={style.formcontainer}>
 <TextInput
 style={style.input}
 placeholder="Add A new Todo"
 placeholderTextColor= '#aaaaaa'
 onChangeText={(heading)=> setAddData(heading)}
 value={addData}
 underlineColorAndroid='transparent'
autoCapitalize='none'
 />

 <TouchableOpacity style={style.button} onPress={addTodo}>
 <Text style={style.buttonText}>Add</Text>
 </TouchableOpacity>
 </View>

 <FlatList
 data={todos}
 numColumns={1}
 renderItem={({item}) => (
    <View>
    <Pressable 
    style={style.container}
    onPress={()=> navigation.navigate('Detail', {item})}>
    <FontAwesome  name='trash-o' color='red' onPress={() => deleteTodo(item)}
    style={style.todoIcon}
    />
    <View style={style.innercontainer}>
    <Text style={style.itemHeading}>
    {item.heading[0].toUpperCase() + item.heading.slice(1)}</Text>
    
    </View>
    </Pressable>
    </View>

  )}

 />
 
 

 
 
 </View>
  )
}

export default Home

const style = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innercontainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: 45,


  },
  itemHeading:{
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 22,

  },
  formcontainer:{
    flexDirection: 'row',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },
  input:{
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,

  },
  button:{
      height: 48,
      borderRadius: 5,
      backgroundColor: '#788eec',
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonText:{
      color: '#ffffff',
      fontSize: 20,
  },
  todoIcon:{
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,


 
  },







})
