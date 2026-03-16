export interface ZootecnicMetrics {
  currentWeight: number;
  ca: number; // Conversão Alimentar
  gpd: number; // Ganho de Peso Diário (em kg)
  mortality: number; // %
  daysPassed: number;
  estimatedAbateDate: Date;
  projectedRevenue: number;
  projectedProfit: number;
}

export function calculateMetrics(
  initialQuantity: number,
  initialAvgWeight: number,
  startDate: Date,
  logs: { weekNumber: number; feedConsumed: number; deaths: number; currentAvgWeight: number }[]
): ZootecnicMetrics {
  const latestLog = logs[logs.length - 1];
  const totalDeaths = logs.reduce((acc, log) => acc + log.deaths, 0);
  const currentQuantity = initialQuantity - totalDeaths;
  
  const totalFeed = logs.reduce((acc, log) => acc + log.feedConsumed, 0);
  
  const initialTotalWeight = initialQuantity * initialAvgWeight;
  const currentTotalWeight = currentQuantity * (latestLog?.currentAvgWeight || initialAvgWeight);
  
  // CA = Total Ração / Ganho de Peso Total
  const ca = totalFeed / (currentTotalWeight - initialTotalWeight) || 0;
  
  const now = new Date();
  const daysPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // GPD = (Peso Atual - Peso Inicial) / Dias
  const gpd = (latestLog?.currentAvgWeight - initialAvgWeight) / daysPassed || 0;
  
  const mortality = (totalDeaths / initialQuantity) * 100;

  // Previsão de Saída (Peso Alvo: 110kg)
  const targetWeight = 110;
  const remainingWeight = targetWeight - (latestLog?.currentAvgWeight || initialAvgWeight);
  const remainingDays = remainingWeight / gpd || 0;
  
  const estimatedAbateDate = new Date(now.getTime() + remainingDays * 24 * 60 * 60 * 1000);

  return {
    currentWeight: latestLog?.currentAvgWeight || initialAvgWeight,
    ca,
    gpd,
    mortality,
    daysPassed,
    estimatedAbateDate,
    projectedRevenue: currentQuantity * targetWeight * 18, // Simulação: R$ 18/kg
    projectedProfit: (currentQuantity * targetWeight * 18) - (totalFeed * 1.8) // Simulação: R$ 1.80/kg ração
  };
}

// Curva Ideal (PIC/Topigs): Ex simplificado
// 110kg em 110 dias de engorda
export function getIdealWeightForDay(day: number): number {
    // Exemplo de curva linear simples para MVP
    // Começa com ~25kg no dia 0
    return 25 + (day * (110 - 25) / 110);
}
