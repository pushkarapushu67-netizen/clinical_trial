import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { motion } from 'motion/react';

interface InsightsBoardProps {
  history?: any[];
}

export const InsightsBoard = ({ history = [] }: InsightsBoardProps) => {
  const chartData = history.map(h => ({
    age: h.data.age,
    hr: h.data.maxHR,
    risk: h.result.riskScore
  }));

  const mockCorrelationData = [
    { name: 'Age-Risk', value: history.length > 0 ? 0.72 : 0 },
    { name: 'Chol-Risk', value: history.length > 0 ? 0.85 : 0 },
    { name: 'BP-Risk', value: history.length > 0 ? 0.64 : 0 },
    { name: 'ECG-Risk', value: history.length > 0 ? 0.32 : 0 },
    { name: 'HeartRate-Risk', value: history.length > 0 ? -0.45 : 0 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Age vs Heart Rate Scatter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 border border-outline-variant rounded-medical-lg shadow-sm h-[400px] flex flex-col"
      >
        <div className="mb-6 text-left">
          <h3 className="label-caps mb-1">Heart Rate Distribution</h3>
          <p className="text-[10px] text-outline font-bold tracking-widest uppercase">Max HR vs Age Distribution</p>
        </div>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {history.length > 0 ? (
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  dataKey="age" 
                  name="Age" 
                  unit="y" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#1A1A1A' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="hr" 
                  name="Max HR" 
                  unit="bpm" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#1A1A1A' }}
                />
                <ZAxis type="number" range={[100, 400]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ 
                    borderRadius: '0px', 
                    border: '1px solid rgba(26,26,26,0.1)', 
                    fontSize: '12px',
                    fontFamily: 'Hanken Grotesk',
                    background: '#F5F2ED'
                  }}
                />
                <Scatter name="Patients" data={chartData}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.risk > 0.5 ? '#ba1a1a' : '#1A1A1A'} 
                      fillOpacity={0.6}
                      stroke={entry.risk > 0.5 ? '#ba1a1a' : '#1A1A1A'}
                      strokeWidth={1}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            ) : (
              <div className="h-full flex items-center justify-center text-[10px] uppercase font-bold tracking-widest opacity-20">
                Awaiting Population Data
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Feature Correlation Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 border border-outline-variant rounded-medical-lg shadow-sm h-[400px] flex flex-col"
      >
        <div className="mb-6 text-left">
          <h3 className="label-caps mb-1">Diagnostic Correlation</h3>
          <p className="text-[10px] text-outline font-bold tracking-widest uppercase">Feature Association Weights</p>
        </div>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {history.length > 0 ? (
              <BarChart data={mockCorrelationData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#1A1A1A' }}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#1A1A1A' }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(26,26,26,0.05)' }} 
                  contentStyle={{ background: '#F5F2ED', border: '1px solid rgba(26,26,26,0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 0, 0, 0]}>
                  {mockCorrelationData.map((entry, index) => (
                    <Cell 
                    key={`cell-${index}`} 
                    fill={entry.value > 0.6 ? '#ba1a1a' : '#1A1A1A'}
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <div className="h-full flex items-center justify-center text-[10px] uppercase font-bold tracking-widest opacity-20">
                Awaiting Feature Weights
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
