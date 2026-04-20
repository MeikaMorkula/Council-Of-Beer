import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useFocusEffect,
  useNavigation,
  useScrollToTop,
} from "@react-navigation/native";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Beer, search } from "../services/SearchService";

function ProductComponent({ beer }: { beer: Beer }) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.productCont}
      onPress={() => navigation.navigate("ProductPage")}
      activeOpacity={0.8}
    >
      <Image
        style={styles.productIcon}
        source={beer.imageUrl ? { uri: beer.imageUrl } : undefined}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productText}>
          {beer.name}, {beer.alcPrecentage}%
        </Text>
        <Text style={styles.productText}>
          {beer.brewery}, {beer.country}
        </Text>
        <Text style={styles.labelsText}>
          Labels: {beer.labels.length > 0 ? beer.labels.join(", ") : "No labels"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Search() {
  const navigation = useNavigation<any>();
  const scrollRef = useRef<ScrollView>(null);
  const [beers, setBeers] = useState<Beer[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const filteredBeers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return beers;
    }

    return beers.filter((beer) => {
      const labelsText = beer.labels.join(" ").toLowerCase();
      return (
        beer.name.toLowerCase().includes(normalizedQuery) ||
        beer.brewery.toLowerCase().includes(normalizedQuery) ||
        beer.country.toLowerCase().includes(normalizedQuery) ||
        labelsText.includes(normalizedQuery)
      );
    });
  }, [beers, query]);

  const loadBeers = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await search();
      setBeers(response);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to load beers");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    loadBeers();
  }, [loadBeers]);

  useEffect(() => {
    const topTabNavigation = navigation.getParent()?.getParent() as any;

    const unsubscribe = topTabNavigation?.addListener("tabPress", () => {
      if (navigation.isFocused()) {
        scrollToTop(true);
      }
    });

    return unsubscribe;
  }, [navigation, scrollToTop]);

  return (
    <View style={styles.container}>
      <View style={styles.searchCont}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchField}
            placeholder="Search"
            placeholderTextColor={"#EDE9C7"}
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => {
              scrollToTop(true);
            }}
          >
            <Ionicons name="search" size={32} color="#EDE9C7" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView ref={scrollRef} style={styles.resultArea}>
        {isLoading ? (
          <View style={styles.statusContainer}>
            <ActivityIndicator color="#EDE9C7" size="large" />
          </View>
        ) : null}

        {!isLoading && errorMessage ? (
          <Text style={styles.statusText}>{errorMessage}</Text>
        ) : null}

        {!isLoading && !errorMessage && filteredBeers.length === 0 ? (
          <Text style={styles.statusText}>No beers found.</Text>
        ) : null}

        {!isLoading && !errorMessage
          ? filteredBeers.map((beer, index) => (
              <ProductComponent
                key={`${beer.name || "beer"}-${beer.imageUrl || "no-image"}-${index}`}
                beer={beer}
              />
            ))
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D190E",
  },
  searchCont: {
    position: "relative",
    backgroundColor: "#1D190E",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#1D190E",
  },
  searchField: {
    backgroundColor: "#28200C",
    color: "#EDE9C7",
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    fontSize: 20,
    height: 65,
    width: "87%",
  },
  searchIcon: {
    backgroundColor: "#28200C",
    color: "#EDE9C7",
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    height: 65,
  },
  resultArea: {
    flex: 1,
    backgroundColor: "#1D190E",
  },
  statusContainer: {
    padding: 24,
    alignItems: "center",
  },
  statusText: {
    color: "#EDE9C7",
    textAlign: "center",
    padding: 24,
    fontSize: 16,
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
  labelsText: {
    fontSize: 14,
    color: "#EDE9C7",
  },
});
