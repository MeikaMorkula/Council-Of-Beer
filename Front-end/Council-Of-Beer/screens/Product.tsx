import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { Beer, getBeerByName } from "../services/ProductService";

type Review = {
  id: string;
  username: string;
  rating: number;
  text: string;
};

const REVIEWS: Review[] = [
  { id: "1", username: "@kalianjuoja", rating: 4.5, text: "on hyvettiä" },
  { id: "2", username: "@kaliaherra", rating: 5, text: "guunaa suussa" },
  { id: "3", username: "@kalialainen", rating: 1, text: "rimmeriä" },
];

type ProductPageRouteParams = {
  beerName?: string;
};

export default function ProductPage() {
  const route = useRoute();
  const { beerName } = (route.params as ProductPageRouteParams | undefined) ?? {};
  const [beer, setBeer] = useState<Beer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadBeer = useCallback(async () => {
    if (!beerName) {
      setErrorMessage("Beer was not provided for this page.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await getBeerByName(beerName);
      setBeer(response);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to load beer details.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [beerName]);

  useEffect(() => {
    loadBeer();
  }, [loadBeer]);

  if (isLoading) {
    return (
      <View style={styles.statusContainer}>
        <ActivityIndicator size="large" color="#EDE9C7" />
      </View>
    );
  }

  if (errorMessage || !beer) {
    return (
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {errorMessage || "Beer details were not found."}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postImgCont}>
        <Image
          style={styles.postImg}
          resizeMode="contain"
          source={beer.imageUrl ? { uri: beer.imageUrl } : undefined}
        />
      </View>

      <View style={styles.postBeerInfoCont}>
        <View style={styles.infoRow}>
          <Text style={styles.mainInfoText}>{beer.name}, </Text>
          <StarRatingDisplay
            rating={4}
            starSize={22}
            starStyle={styles.productRating}
          />
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.subInfoText}>{beer.alcPrecentage}%, </Text>
          <Text style={styles.subInfoText}>{beer.brewery}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.subInfoText}>{beer.country}</Text>
        </View>
      </View>

      <View style={styles.tagRow}>
        {beer.labels.map((tag) => (
          <View key={tag} style={styles.tagChip}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addBtn}>
        <Ionicons name="add-circle" size={20} color="#EDE9C7" />
        <Text style={styles.addBtnText}>Add to collection</Text>
      </TouchableOpacity>

      <View style={styles.postReviewCont}>
        <Text style={styles.reviewTitle}>Reviews</Text>

        {REVIEWS.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeaderRow}>
              <Text style={styles.reviewUser}>{review.username}</Text>
              <StarRatingDisplay
                rating={review.rating}
                starSize={16}
                starStyle={styles.reviewRating}
              />
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D190E",
  },
  statusContainer: {
    flex: 1,
    backgroundColor: "#1D190E",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  statusText: {
    color: "#EDE9C7",
    fontSize: 16,
    textAlign: "center",
  },
  postHeader: {
    flexDirection: "row",
  },
  userPfp: {
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "#EDE9C7",
    width: 45,
    height: 45,
    margin: 10,
  },
  postUsrname: {
    color: "#EDE9C7",
    fontSize: 18,
    textAlignVertical: "center",
  },
  postImgCont: {
    height: 360,
    backgroundColor: "#926C43",
    justifyContent: "center",
  },
  postImg: {
    height: "100%",
    width: "100%",
  },
  postBeerInfoCont: {
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
  },
  mainInfoText: {
    color: "#EDE9C7",
    fontSize: 24,
  },
  subInfoText: {
    color: "#EDE9C7",
    fontSize: 20,
  },
  productRating: {
    marginHorizontal: 2,
    marginTop: 5,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 8,
  },
  tagChip: {
    borderWidth: 0.5,
    borderColor: "#EDE9C7",
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#28200C",
  },
  tagText: {
    color: "#EDE9C7",
    fontSize: 13,
  },
  addBtn: {
    marginTop: 14,
    marginHorizontal: 20,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#28200C",
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "#EDE9C7",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addBtnText: {
    color: "#EDE9C7",
    fontSize: 14,
    marginLeft: 8,
  },
  postReviewCont: {
    padding: 20,
  },
  reviewTitle: {
    color: "#EDE9C7",
    fontSize: 24,
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: "#28200C",
    borderWidth: 0.5,
    borderColor: "#EDE9C7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  reviewHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewUser: {
    color: "#EDE9C7",
    fontSize: 16,
    marginBottom: 4,
  },
  reviewRating: {
    marginHorizontal: 1,
  },
  reviewText: {
    color: "#EDE9C7",
    fontSize: 15,
    marginTop: 4,
  },
});
