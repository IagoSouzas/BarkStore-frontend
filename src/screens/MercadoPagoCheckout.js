import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import { parseMpReturn } from '../mpReturn';

// Versão nativa (Android/iOS): mostra o Checkout Pro do Mercado Pago em um WebView.
export default function MercadoPagoCheckout({ navigation, route }) {
  const { url, pedidoId } = route.params;

  // Quando o Mercado Pago redireciona para o retorno, o app assume o controle da navegação.
  const aoNavegar = (request) => {
    const retorno = parseMpReturn(request.url);
    if (!retorno) return true;
    navigation.replace('Confirmation', { pedidoId: retorno.pedidoId, paymentId: retorno.paymentId, status: retorno.status });
    return false;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 14 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} accessibilityLabel="Voltar ao carrinho">
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 12, fontWeight: '700', fontSize: fonts.subtitle }}>Pagamento seguro · pedido #{pedidoId}</Text>
      </View>
      <WebView source={{ uri: url }} startInLoadingState onShouldStartLoadWithRequest={aoNavegar} />
    </SafeAreaView>
  );
}
