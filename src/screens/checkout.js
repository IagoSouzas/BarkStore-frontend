import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Header, AppHeader, BackRow, Card, Button, Stepper, ProductImage, Row, H } from '../components';
import { colors, fonts, money, fmtDate } from '../theme';
import { apiFetch } from '../api';
import { APP_ENV } from '../config';
import { useStore } from '../store';

export function Cart({ navigation }) {
  const { cartItems, changeQty, removeItem, subtotal } = useStore();
  return (
    <Screen>
      <AppHeader navigation={navigation} />
      <BackRow navigation={navigation} title="Meu carrinho" />
      {cartItems.length === 0 && <Text style={{ color: colors.muted, textAlign: 'center', marginVertical: 30 }}>Seu carrinho está vazio.</Text>}
      {cartItems.map((i) => (
        <Card key={i.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ProductImage product={i} size={80} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={{ fontWeight: '700', fontSize: fonts.subtitle }}>{i.name}</Text>
            <Text style={{ color: colors.primary, fontWeight: '700', marginVertical: 4 }}>{money(i.price)}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => removeItem(i.id)}><Text style={{ color: colors.danger }}>Remover</Text></TouchableOpacity>
              <Stepper value={i.qty} onMinus={() => changeQty(i.id, -1)} onPlus={() => changeQty(i.id, 1)} />
            </View>
          </View>
        </Card>
      ))}
      <H>Resumo do pedido</H>
      <Row left="Subtotal" right={money(subtotal)} />
      <Row left="Entrega" right={<Text style={{ color: colors.success, fontWeight: '700', fontSize: fonts.subtitle }}>Grátis</Text>} />
      <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 10 }} />
      <Row bold left={<Text style={{ fontWeight: '700', fontSize: fonts.h3 }}>Total</Text>} right={<Text style={{ color: colors.primary, fontWeight: '800', fontSize: fonts.h2 }}>{money(subtotal)}</Text>} />
      <Button title="Finalizar compra" disabled={cartItems.length === 0} onPress={() => navigation.navigate('Payment')} />
      <TouchableOpacity onPress={() => navigation.navigate('Products')} style={{ alignItems: 'center', marginTop: 6 }}>
        <Text style={{ color: colors.primary, fontWeight: '700' }}>← Continuar comprando</Text>
      </TouchableOpacity>
    </Screen>
  );
}

export function Payment({ navigation }) {
  const { cartItems, subtotal } = useStore();
  const [loading, setLoading] = useState(false);
  // Única chamada ao backend nesta tela: cria o pedido e a preferência do Checkout Pro.
  const pay = async () => {
    setLoading(true);
    try {
      const itens = cartItems.map((i) => ({ produtoId: i.id, quantidade: i.qty }));
      const r = await apiFetch('/pagamentos/checkout', { method: 'POST', body: { itens } });
      const url = APP_ENV === 'production' ? r.initPoint : (r.sandboxInitPoint || r.initPoint);
      navigation.navigate('MercadoPagoCheckout', { url, pedidoId: r.pedidoId, preferenciaId: r.preferenciaId });
    } catch (error) {
      Alert.alert('Pagamento', error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Screen>
      <Header showBack title="Pagamento" navigation={navigation} />
      <H style={{ marginTop: 0 }}>Resumo da compra</H>
      <Card>
        {cartItems.map((i) => (
          <View key={i.id} style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: '700', fontSize: fonts.subtitle }}>{i.name}{i.qty > 1 ? ` (x${i.qty})` : ''}</Text>
            <Text style={{ color: colors.primary, fontWeight: '600' }}>{money(i.price * i.qty)}</Text>
          </View>
        ))}
      </Card>
      <H style={{ fontSize: fonts.h2 }}>Forma de pagamento</H>
      <Text style={{ color: colors.muted, marginBottom: 12 }}>Você escolherá cartão, PIX ou boleto na página segura do Mercado Pago.</Text>
      <Row bold left={<Text style={{ fontWeight: '700', fontSize: fonts.h3 }}>Total</Text>} right={<Text style={{ color: colors.primary, fontWeight: '800', fontSize: fonts.h2 }}>{money(subtotal)}</Text>} />
      <Button title={loading ? 'Abrindo pagamento...' : `Pagar ${money(subtotal)}`} disabled={loading || cartItems.length === 0} onPress={pay} />
      <Text style={{ textAlign: 'center', color: colors.muted, fontWeight: '600' }}>🔒 Pagamento seguro</Text>
    </Screen>
  );
}

export function Confirmation({ navigation }) {
  const { lastOrder } = useStore();
  return (
    <Screen>
      <Header showBack navigation={navigation} />
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <View style={{ width: 90, height: 90, borderRadius: 45, backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="checkmark" size={56} color="#fff" />
        </View>
        <Text style={{ fontSize: fonts.h1, fontWeight: '800', marginTop: 24 }}>Pedido confirmado!</Text>
        <Text style={{ color: colors.muted, textAlign: 'center', fontSize: fonts.subtitle, marginVertical: 12 }}>
          {'Seu pedido foi realizado com sucesso.\nObrigado por confiar na Bark Store!'}
        </Text>
      </View>
      {lastOrder && (
        <Card style={{ padding: 20 }}>
          <Text style={{ fontWeight: '800', fontSize: fonts.subtitle }}>Pedido #{lastOrder.id}</Text>
          <Text style={{ color: colors.muted, marginTop: 6 }}>Data do pedido: {fmtDate(lastOrder.date)}</Text>
          <Text style={{ color: colors.muted, marginTop: 6 }}>Entrega estimada: em até 5 dias úteis</Text>
        </Card>
      )}
      <Button title="Voltar ao início" onPress={() => navigation.navigate('Início')} style={{ marginTop: 20 }} />
      <TouchableOpacity onPress={() => navigation.navigate('Products')} style={{ alignItems: 'center', marginTop: 6 }}>
        <Text style={{ color: colors.primary, fontWeight: '700' }}>← Continuar comprando</Text>
      </TouchableOpacity>
    </Screen>
  );
}