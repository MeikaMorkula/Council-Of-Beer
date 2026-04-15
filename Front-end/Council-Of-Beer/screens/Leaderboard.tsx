import React, { useCallback, useEffect, useRef } from "react";
import {
  useFocusEffect,
  useNavigation,
  useScrollToTop,
} from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";

function ProductComponent() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.productCont}
      onPress={() => navigation.navigate("ProductPage")}
      activeOpacity={0.8}
    >
      <Image style={styles.productIcon} />
      <View style={styles.productInfo}>
        <Text style={styles.productText}>Beer, 6,6%</Text>
        <Text style={styles.productText}>Brewery, Country</Text>
        <StarRatingDisplay
          rating={3.5}
          starSize={24}
          starStyle={styles.productRating}
        />
      </View>
    </TouchableOpacity>
  );
}

export default function Leaderboard() {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);

  const scrollToTop = useCallback((animated = true) => {
    scrollRef.current?.scrollTo({ y: 0, animated });
  }, []);

  useScrollToTop(scrollRef);

  useFocusEffect(
    useCallback(() => {
      scrollToTop(false);
    }, [scrollToTop]),
  );

  useEffect(() => {
    const topTabNavigation = navigation.getParent()?.getParent();

    const unsubscribe = topTabNavigation?.addListener("tabPress", () => {
      if (navigation.isFocused()) {
        scrollToTop(true);
      }
    });

    return unsubscribe;
  }, [navigation, scrollToTop]);

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D190E",
  },
  productCont: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EDE9C7",
    padding: 20,
  },
  productIcon: {
    width: 75,
    height: 75,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#EDE9C7",
    backgroundColor: "white",
  },
  productInfo: {
    flexDirection: "column",
    paddingLeft: 10,
  },
  productText: {
    fontSize: 16,
    paddingBottom: 5,
    color: "#EDE9C7",
  },
  productRating: {
    marginHorizontal: 2,
  },
});
