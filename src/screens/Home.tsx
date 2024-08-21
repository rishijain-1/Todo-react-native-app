import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { getAuth, User } from "firebase/auth";

type Task = string;

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBrFebuI3nKEsF6uk-mNcud2WMPZaLdfs0",
  authDomain: "todoauth-7fb70.firebaseapp.com",
  projectId: "todoauth-7fb70",
  storageBucket: "todoauth-7fb70.appspot.com",
  messagingSenderId: "187808964728",
  appId: "1:187808964728:web:18cc8a12b219e3486ecd8d",
  measurementId: "G-33ENBDX4P7",
  databaseURL: "https://todoauth-7fb70-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const Home: React.FC = () => {
    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [search, setSearch] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
                loadTasks(authUser.uid);
            }
        });
        return unsubscribe;
    }, []);

    const loadTasks = async (userId: string) => {
        try {
            const tasksRef = ref(database, `tasks/${userId}`);
            onValue(tasksRef, (snapshot) => {
                const data = snapshot.val();
                const loadedTasks = data ? Object.values(data) as string[] : [];
                setTasks(loadedTasks);
            });
        } catch (error) {
            console.error("Failed to load tasks from database", error);
        }
    };

    const saveTasks = async (updatedTasks: Task[]) => {
        if (user) {
            try {
                const tasksRef = ref(database, `tasks/${user.uid}`);
                await set(tasksRef, updatedTasks);
            } catch (error) {
                console.error("Failed to save tasks to database", error);
            }
        }
    };

    const handleAddTask = () => {
        if (task) {
            let updatedTasks = [...tasks];
            if (editIndex !== null) {
                // Edit existing task
                updatedTasks[editIndex] = task;
                setEditIndex(null);
            } else {
                // Add new task
                updatedTasks = [...updatedTasks, task];
            }
            setTasks(updatedTasks);
            setTask("");
            saveTasks(updatedTasks);
        }
    };

    const handleEditTask = (index: number) => {
        const taskToEdit = tasks[index];
        setTask(taskToEdit);
        setEditIndex(index);
    };

    const handleDeleteTask = async (index: number) => {
        try {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
        } catch (error:any) {
            Alert.alert("Failed to delete task", error);
        }
    };

    const handleExportTask = async (task: string) => {
        try {
            const fileUri = FileSystem.documentDirectory + `${task}.txt`;
            await FileSystem.writeAsStringAsync(fileUri, task);
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri);
            } else {
                alert("Sharing is not available on this device");
            }
        } catch (error:any) {
            Alert.alert("Failed to export task", error);
        }
    };

    const filteredTasks = tasks.filter((t) =>
        t.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item, index }: { item: string; index: number }) => (
        <View style={styles.task}>
            <Text style={styles.itemList}>{item}</Text>
            <View style={styles.taskButtons}>
                <TouchableOpacity onPress={() => handleEditTask(index)}>
                    <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleExportTask(item)}>
                    <Text style={styles.exportButton}>Export</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                    <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>WelCome {user?.email}</Text>
            <TextInput
                style={styles.input}
                placeholder="Search tasks"
                value={search}
                onChangeText={setSearch}
            />
            <Text style={styles.title}>ToDo App</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter task"
                value={task}
                onChangeText={setTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                <Text style={styles.addButtonText}>
                    {editIndex !== null ? "Update Task" : "Add Task"}
                </Text>
            </TouchableOpacity>
            
            <FlatList
                data={filteredTasks}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    heading: {
        fontSize: 15,
        paddingBottom: 10,
        fontWeight: "bold",
        marginBottom: 7,
        color: "green",
    },
    input: {
        borderWidth: 3,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 18,
    },
    addButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    addButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    task: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        fontSize: 18,
    },
    itemList: {
        fontSize: 19,
    },
    taskButtons: {
        flexDirection: "row",
    },
    editButton: {
        marginRight: 10,
        color: "white",
        padding: 5,
        backgroundColor: "green",
        borderRadius: 5,
        fontSize: 18,
    },
    exportButton: {
        marginRight: 10,
        color: "white",
        padding: 5,
        backgroundColor: "blue",
        borderRadius: 5,
        fontSize: 18,
    },
    deleteButton: {
        color: "white",
        padding: 5,
        backgroundColor: "red",
        borderRadius: 5,
        fontSize: 18,
    },
});

export default Home;
