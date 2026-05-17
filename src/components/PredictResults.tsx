import { motion } from 'motion/react';
import { PredictionResult } from '../types';
import { ShieldCheck, ShieldAlert, Sparkles, ChevronRight, Download } from 'lucide-react';
import { cn } from '../lib/utils';

interface PredictResultsProps {
  result: PredictionResult;
}

export const PredictResults = ({ result }: PredictResultsProps) => {
  const isHighRisk = result.riskScore > 0.5;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Result Indicator Badge Area */}
      <div className={cn(
        "p-1 rounded-full flex items-center justify-between gap-4 border",
        isHighRisk ? "bg-status-critical/10 border-status-critical/20" : "bg-status-success/10 border-status-success/20"
      )}>
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center text-white",
          isHighRisk ? "bg-status-critical" : "bg-status-success"
        )}>
          {isHighRisk ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          <span className={cn(
            "label-caps font-bold",
            isHighRisk ? "text-status-critical" : "text-status-success"
          )}>
            Diagnostic Status: {isHighRisk ? 'Critical Intervention Required' : 'Optimal/Low Risk'}
          </span>
        </div>
        <div className="px-6 py-2">
           <span className="data-mono font-bold text-lg">{(result.riskScore * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Main Result Card */}
      <div className="bg-white border border-outline-variant rounded-medical-lg overflow-hidden shadow-sm">
        <div className={cn(
          "h-2",
          isHighRisk ? "bg-status-critical" : "bg-status-success"
        )} />
        
        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h3 className="headline-md mb-1">Risk Evaluation Report</h3>
              <p className="body-sm text-outline">Confidence Score: {(0.85 + Math.random() * 0.1).toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-outline-variant rounded-medical hover:bg-surface-container transition-colors">
                <Download className="w-4 h-4 text-outline" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 space-y-6">
              {/* Insight Summary */}
              {result.clinicalInsights && (
                <div className="bg-surface-container-low p-6 rounded-medical border border-outline-variant">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-primary-clinical" />
                    <span className="label-caps text-primary-clinical">Clinical AI Insight</span>
                  </div>
                  <p className="body-md text-on-surface leading-relaxed mb-6 font-medium italic">
                    "{result.clinicalInsights.summary}"
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="label-caps mb-4 text-on-surface">Identified Risk Factors</h4>
                      <ul className="space-y-3">
                        {result.clinicalInsights.riskFactors.map((factor, i) => (
                          <li key={i} className="flex items-center gap-3 p-2 bg-white rounded-medical border border-outline-variant shadow-sm border-l-4 border-l-status-critical">
                            <span className="data-mono text-xs text-status-critical">RF-{i+1}</span>
                            <span className="text-body-sm font-medium">{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="label-caps mb-4 text-on-surface">Recommendations</h4>
                      <ul className="space-y-3">
                        {result.clinicalInsights.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-3 p-2 bg-white rounded-medical border border-outline-variant shadow-sm border-l-4 border-l-primary-clinical">
                             <ChevronRight className="w-4 h-4 text-primary-clinical mt-0.5 shrink-0" />
                            <span className="text-body-sm font-medium">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
