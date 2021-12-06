import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addGoalHandler = (newGoal) => {
    setCourseGoals([
      ...courseGoals,
      { id: Math.random().toString(), value: newGoal },
    ]);
    setShowModal(false);
  };

  const removeGoalHandler = (goalId) => [
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    }),
  ];

  const cancelGoalAdditionHandler = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="ADD NEW GOAL" onPress={() => setShowModal(true)} />
      <GoalInput
        onAddGoal={addGoalHandler}
        visible={showModal}
        onCancel={cancelGoalAdditionHandler}
      />
      <View>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={courseGoals}
          renderItem={(itemData) => (
            <GoalItem
              id={itemData.item.id}
              goal={itemData.item.value}
              onDelete={removeGoalHandler}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 50 },
});
