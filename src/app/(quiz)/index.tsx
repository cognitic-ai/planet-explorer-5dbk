import { planets } from "@/data/planets";
import AC from "@bacons/apple-colors";
import { useState, useMemo, useCallback } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  planetName: string;
}

function generateQuestions(): Question[] {
  const questions: Question[] = [];

  // Question types
  planets.forEach((planet) => {
    // Moons question
    questions.push({
      question: `How many moons does ${planet.name} have?`,
      options: shuffleWithCorrect(
        [planet.moons.toString()],
        ["0", "1", "2", "16", "28", "79", "95", "146"].filter(
          (m) => m !== planet.moons.toString()
        ),
        3
      ),
      correctIndex: 0,
      planetName: planet.name,
    });

    // Subtitle question
    questions.push({
      question: `${planet.name} is known as...`,
      options: shuffleWithCorrect(
        [planet.subtitle],
        planets.filter((p) => p.id !== planet.id).map((p) => p.subtitle),
        3
      ),
      correctIndex: 0,
      planetName: planet.name,
    });
  });

  // Shuffle and take random questions
  return questions.sort(() => Math.random() - 0.5).slice(0, 10);
}

function shuffleWithCorrect(
  correct: string[],
  others: string[],
  totalOptions: number
): string[] {
  const shuffledOthers = others.sort(() => Math.random() - 0.5);
  const options = [...correct, ...shuffledOthers.slice(0, totalOptions - 1)];
  return options.sort(() => Math.random() - 0.5);
}

function OptionButton({
  option,
  index,
  selected,
  correct,
  showResult,
  onPress,
}: {
  option: string;
  index: number;
  selected: boolean;
  correct: boolean;
  showResult: boolean;
  onPress: () => void;
}) {
  const getBgColor = () => {
    if (!showResult) {
      return selected ? AC.systemBlue : AC.secondarySystemBackground;
    }
    if (correct) return AC.systemGreen;
    if (selected && !correct) return AC.systemRed;
    return AC.secondarySystemBackground;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={showResult}
      style={{
        padding: 16,
        backgroundColor: getBgColor(),
        borderRadius: 14,
        borderCurve: "continuous",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor:
            selected || (showResult && correct)
              ? "rgba(255,255,255,0.2)"
              : AC.tertiarySystemBackground,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color:
              selected || (showResult && correct) ? "white" : AC.secondaryLabel,
          }}
        >
          {String.fromCharCode(65 + index)}
        </Text>
      </View>
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          color:
            selected || (showResult && correct) ? "white" : AC.label,
          fontWeight: selected ? "600" : "400",
        }}
      >
        {option}
      </Text>
    </Pressable>
  );
}

export default function QuizRoute() {
  const [questions, setQuestions] = useState<Question[]>(() =>
    generateQuestions()
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = questions[currentIndex];

  const correctAnswerIndex = useMemo(() => {
    if (!currentQuestion) return -1;
    const correctOption = currentQuestion.options[currentQuestion.correctIndex];
    return currentQuestion.options.indexOf(correctOption);
  }, [currentQuestion]);

  const handleSelect = useCallback(
    (index: number) => {
      if (showResult) return;
      setSelectedIndex(index);
    },
    [showResult]
  );

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;

    if (!showResult) {
      // Show result
      setShowResult(true);
      if (selectedIndex === correctAnswerIndex) {
        setScore((s) => s + 1);
      }
    } else {
      // Move to next question
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
        setSelectedIndex(null);
        setShowResult(false);
      } else {
        setQuizComplete(true);
      }
    }
  }, [selectedIndex, showResult, correctAnswerIndex, currentIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setSelectedIndex(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  }, []);

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
          gap: 24,
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%",
        }}
      >
        <Animated.View
          entering={FadeIn}
          style={{ alignItems: "center", gap: 16 }}
        >
          <Text style={{ fontSize: 64 }}>
            {percentage >= 80 ? "🎉" : percentage >= 50 ? "👍" : "📚"}
          </Text>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: AC.label,
              textAlign: "center",
            }}
          >
            {percentage >= 80
              ? "Amazing!"
              : percentage >= 50
              ? "Good Job!"
              : "Keep Learning!"}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: AC.secondaryLabel,
              textAlign: "center",
            }}
          >
            You scored {score} out of {questions.length}
          </Text>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: AC.secondarySystemBackground,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <Text
              style={{
                fontSize: 36,
                fontWeight: "700",
                color:
                  percentage >= 80
                    ? AC.systemGreen
                    : percentage >= 50
                    ? AC.systemOrange
                    : AC.systemRed,
                fontVariant: ["tabular-nums"],
              }}
            >
              {percentage}%
            </Text>
          </View>
        </Animated.View>
        <Pressable
          onPress={handleRestart}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 32,
            backgroundColor: AC.systemBlue,
            borderRadius: 14,
            borderCurve: "continuous",
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
            Try Again
          </Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 20 }}
    >
      {/* Progress */}
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 14, color: AC.secondaryLabel }}>
            Question {currentIndex + 1} of {questions.length}
          </Text>
          <Text style={{ fontSize: 14, color: AC.systemBlue, fontWeight: "600" }}>
            Score: {score}
          </Text>
        </View>
        <View
          style={{
            height: 6,
            backgroundColor: AC.secondarySystemBackground,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
              height: "100%",
              backgroundColor: AC.systemBlue,
              borderRadius: 3,
            }}
          />
        </View>
      </View>

      {/* Question */}
      <Animated.View
        key={currentIndex}
        entering={FadeIn.duration(300)}
        style={{ gap: 20 }}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: AC.secondarySystemBackground,
            borderRadius: 16,
            borderCurve: "continuous",
          }}
        >
          <Text
            selectable
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: AC.label,
              lineHeight: 28,
              textAlign: "center",
            }}
          >
            {currentQuestion.question}
          </Text>
        </View>

        {/* Options */}
        <View style={{ gap: 12 }}>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              option={option}
              index={index}
              selected={selectedIndex === index}
              correct={index === correctAnswerIndex}
              showResult={showResult}
              onPress={() => handleSelect(index)}
            />
          ))}
        </View>

        {/* Result feedback */}
        {showResult && (
          <Animated.View
            entering={FadeIn}
            style={{
              padding: 16,
              backgroundColor:
                selectedIndex === correctAnswerIndex
                  ? `${AC.systemGreen}22`
                  : `${AC.systemRed}22`,
              borderRadius: 14,
              borderCurve: "continuous",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color:
                  selectedIndex === correctAnswerIndex
                    ? AC.systemGreen
                    : AC.systemRed,
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {selectedIndex === correctAnswerIndex
                ? "Correct! 🎉"
                : `The answer was: ${currentQuestion.options[correctAnswerIndex]}`}
            </Text>
          </Animated.View>
        )}
      </Animated.View>

      {/* Next Button */}
      <Pressable
        onPress={handleNext}
        disabled={selectedIndex === null}
        style={{
          paddingVertical: 16,
          backgroundColor:
            selectedIndex === null ? AC.tertiarySystemBackground : AC.systemBlue,
          borderRadius: 14,
          borderCurve: "continuous",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "600",
            color: selectedIndex === null ? AC.tertiaryLabel : "white",
          }}
        >
          {!showResult
            ? "Check Answer"
            : currentIndex < questions.length - 1
            ? "Next Question"
            : "See Results"}
        </Text>
      </Pressable>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}
