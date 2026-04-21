import React, { useCallback, useEffect, useRef, useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { Beer, search } from "../services/SearchService";

function ProductComponent( { beer }: { beer: Beer } ) {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={styles.productCont}
      onPress={() => navigation.navigate("ProductPage", { beerName : beer.name })}
      activeOpacity={0.8}
    >
      <Image style={styles.productIcon} 
        source={beer.imageUrl ? { uri: beer.imageUrl } : undefined}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productText}>{beer.name}, {beer.alcPrecentage}%</Text>
        <Text style={styles.productText}>{beer.brewery}, {beer.country}</Text>
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
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [beers, setBeers] = useState<Beer[]>([]);

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

  const loadBeers = useCallback(async () => {
    try{
      setIsLoading(true);
      setErrorMessage("");
      const res = await search();
      setBeers(res);
    } catch (err){
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Failed to load beers")
      }
    } finally {
      setIsLoading(false)
    }
  }, []);

  useFocusEffect(
      useCallback(() => {
        scrollToTop(false);
      }, [scrollToTop]),
    );
  
  useEffect(() => {
    loadBeers();
  }, [loadBeers]);

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      {isLoading ? (
        <View>
          <ActivityIndicator color="#EDE9C7" size="large"/>
        </View>
      ) : null}

      {!isLoading && errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : null}

      {!isLoading && !errorMessage
          ? beers.map((beer, index) => (
              <ProductComponent
                key={`${beer.name || "beer"}-${beer.imageUrl || "no-image"}-${index}`}
                beer={beer}
              />
            ))
          : null}
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
