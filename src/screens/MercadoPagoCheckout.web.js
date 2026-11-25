import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { fonts } from '../theme';
import { Button } from '../components';

// Versão web (Expo web): usa o Wallet brick do @mercadopago/sdk-react com a chave PÚBLICA de teste.
// O Metro escolhe este arquivo automaticamente no web; o bundle nativo nunca importa o SDK.
let inicializado = false;

export default function MercadoPagoCheckout({ navigation, route }) {
  const { preferenciaId, pedidoId } = route.params;

  useEffect(() => {
    if (!inicializado) {
      initMercadoPago(process.env.EXPO_PUBLIC_MP_PUBLIC_KEY, { locale: 'pt-BR' });
      inicializado = true;
    }
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontWeight: '700', fontSize: fonts.subtitle, marginBottom: 12 }}>Pagamento seguro · pedido #{pedidoId}</Text>
      <Wallet initialization={{ preferenceId: preferenciaId }} />
      <Button
        title="Já concluí o pagamento"
        variant="outline"
        onPress={() => navigation.replace('Confirmation', { pedidoId, status: 'pendente' })}
      />
    </View>
  );
}
