import React, { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

import { Button, RadioGroup, SafeScreen } from "@/src/components";
import { styles } from "@/src/styles";
import { useLanguage } from "@/src/translation/LanguageContext";
import { Icons } from "@/src/utils";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation();
  const { currentLang, changeLanguage } = useLanguage();

  const [lang, setLang] = useState(currentLang);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const options = [
    { value: "en", label: t("settings.modal.en"), isSelected: "en" === lang },
    { value: "sp", label: t("settings.modal.sp"), isSelected: "sp" === lang },
  ];

  const onModalButtonPress = async () => {
    await changeLanguage(lang);
    setIsModalVisible(false);
  };

  return (
    <SafeScreen>
      <View style={[styles.container]}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.fontBold,
              { fontSize: 24, fontWeight: "700", marginVertical: 10 },
            ]}
            accessible
            accessibilityRole="header"
            accessibilityLabel={t("settings.headerTitle")}
          >
            {t("settings.headerTitle")}
          </Text>
        </View>

        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 15,
            paddingVertical: 15,
            borderRadius: 10,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={[
              styles.fontBold,
              { fontSize: 16, color: "#666", textAlign: "center" },
            ]}
            accessible
            accessibilityRole="text"
            accessibilityLabel={t("settings.welcomeMessage")}
          >
            {t("settings.welcomeMessage")}
          </Text>

          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={[
              styles.layoutRow,
              styles.center,
              styles.spaceBetween,
              { marginTop: 20 },
            ]}
            accessible
            accessibilityRole="button"
            accessibilityLabel={t("settings.changeLang")}
            accessibilityHint={t("settings.changeLangHint")}
          >
            <Text style={[styles.font]}>{t("settings.changeLang")}</Text>
            <Icons.LangIcon height={20} width={20} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent
        statusBarTranslucent
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        visible={isModalVisible}
        accessible
        accessibilityViewIsModal
      >
        <Pressable
          style={[
            styles.container,
            styles.center,
            {
              backgroundColor: "#00000080",
            },
          ]}
          onPress={() => setIsModalVisible(false)}
        >
          <View
            style={[
              {
                width: "100%",
                borderRadius: 10,
                backgroundColor: "white",
                paddingHorizontal: 20,
                paddingVertical: 10,
              },
            ]}
            accessible
            accessibilityLabel={t("settings.modal.title")}
          >
            <Text
              style={[
                styles.fontBold,
                {
                  fontSize: 18,
                  fontWeight: "700",
                  marginVertical: 10,
                  textAlign: "center",
                },
              ]}
              accessible
              accessibilityRole="header"
            >
              {t("settings.modal.title")}
            </Text>
            <RadioGroup
              options={options}
              selectedValue={lang}
              onValueChange={(lang) => setLang(lang)}
            />

            <Button
              title={t("settings.modal.button")}
              onPress={onModalButtonPress}
              accessibilityRole="button"
              accessibilityLabel={t("settings.modal.button")}
              accessibilityHint={t("settings.modal.buttonHint")}
            />
          </View>
        </Pressable>
      </Modal>
    </SafeScreen>
  );
}
