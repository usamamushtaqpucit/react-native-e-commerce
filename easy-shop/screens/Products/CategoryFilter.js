import React from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Badge, Text } from "native-base";

const CategoryFilter = ({ categories, categoryFilter, setActive, active }) => {
  return (
    <>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        bounces={true}
        horizontal={true}
        renderItem={({ item }) => {
          if (item.name == "All") {
            return (
              <TouchableOpacity
                onPress={() => {
                  categoryFilter("all"), setActive(-1);
                }}
              >
                <Badge
                  style={[
                    styles.item,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                >
                  <Text style={styles.text}>All</Text>
                </Badge>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              onPress={() => {
                categoryFilter(item.id),
                  setActive(categories.findIndex((x) => x.id === item.id));
              }}
            >
              <Badge
                style={[
                  styles.item,
                  { margin: 5 },
                  active == categories.findIndex((x) => x.id === item.id)
                    ? styles.active
                    : styles.inactive,
                ]}
              >
                <Text style={styles.text}>{item.name}</Text>
              </Badge>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  active: {
    backgroundColor: "#2596be",
  },
  inactive: {
    backgroundColor: "#abdbe3",
  },
  text: {
    color: "white",
    fontSize: 15,
  },
});

export default CategoryFilter;
