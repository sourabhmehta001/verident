'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  Tag,
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  ChevronRight,
  Activity,
} from 'lucide-react'
import { questions, products, categories, recommendationRules } from '@/lib/data'

type Tab = 'overview' | 'questions' | 'products' | 'brands' | 'rules'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: LayoutDashboard },
    { id: 'questions' as Tab, label: 'Questions', icon: MessageSquare },
    { id: 'products' as Tab, label: 'Products', icon: Package },
    { id: 'rules' as Tab, label: 'Rules', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl 
                          flex items-center justify-center shadow-lg">
              <span className="text-xl">🏥</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Smile Please</h1>
              <p className="text-xs text-gray-500">Doctor's Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Dr. Admin</span>
            <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-teal-700">DA</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all
                             ${isActive 
                               ? 'bg-teal-50 text-teal-700 font-medium' 
                               : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
                  {tab.label}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto text-teal-400" />}
                </button>
              )
            })}
          </nav>

          <div className="mt-8 p-4 bg-gradient-to-br from-teal-50 to-mint-50 rounded-xl border border-teal-100">
            <h4 className="font-medium text-teal-800 text-sm mb-2">Quick Tip</h4>
            <p className="text-xs text-teal-600 leading-relaxed">
              Configure your recommendation rules to provide personalized product suggestions to your patients.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'questions' && <QuestionsTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'rules' && <RulesTab />}
        </main>
      </div>
    </div>
  )
}

function OverviewTab() {
  const stats = [
    { label: 'Total Questions', value: questions.length, icon: MessageSquare, color: 'blue' },
    { label: 'Products', value: products.toothpaste.length + products.toothbrush.length, icon: Package, color: 'green' },
    { label: 'Active Rules', value: recommendationRules.length, icon: Settings, color: 'purple' },
    { label: 'Categories', value: categories.length, icon: Tag, color: 'orange' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">Manage your dental care recommendation system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                               ${stat.color === 'blue' ? 'bg-blue-100' : ''}
                               ${stat.color === 'green' ? 'bg-green-100' : ''}
                               ${stat.color === 'purple' ? 'bg-purple-100' : ''}
                               ${stat.color === 'orange' ? 'bg-orange-100' : ''}`}>
                  <Icon className={`w-5 h-5
                                  ${stat.color === 'blue' ? 'text-blue-600' : ''}
                                  ${stat.color === 'green' ? 'text-green-600' : ''}
                                  ${stat.color === 'purple' ? 'text-purple-600' : ''}
                                  ${stat.color === 'orange' ? 'text-orange-600' : ''}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Recent Rules</h3>
          <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {recommendationRules.slice(0, 3).map((rule, i) => (
            <div key={rule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{rule.name}</p>
                  <p className="text-xs text-gray-500">Priority: {rule.priority}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuestionsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Questions</h2>
          <p className="text-gray-500 mt-1">Configure the questions asked to patients</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-xl 
                         hover:bg-teal-600 transition-colors font-medium">
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      {/* Questions by Category */}
      {categories.map((category) => {
        const categoryQuestions = questions.filter((q) => q.categoryId === category.id)
        return (
          <div key={category.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500">{categoryQuestions.length} questions</p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {categoryQuestions.map((question) => (
                <div key={question.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{question.text}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {question.options.map((opt) => (
                          <span
                            key={opt.id}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 
                                     text-gray-600 text-xs rounded-lg"
                          >
                            {opt.emoji} {opt.label} (Score: {opt.score})
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-teal-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ProductsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
          <p className="text-gray-500 mt-1">Add and configure dental products</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-xl 
                         hover:bg-teal-600 transition-colors font-medium">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Toothpaste */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            🪥 Toothpaste Products
            <span className="text-sm font-normal text-gray-500">({products.toothpaste.length})</span>
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {products.toothpaste.map((product) => (
            <div key={product.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-mint-50 rounded-xl 
                              flex items-center justify-center text-3xl flex-shrink-0">
                  🪥
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.brand} • {product.price}</p>
                  <div className="flex gap-1 mt-1">
                    {product.features.slice(0, 2).map((f, i) => (
                      <span key={i} className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-teal-600">{product.doctorScore}</p>
                  <p className="text-xs text-gray-500">Doctor Score</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-teal-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toothbrush */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            🦷 Toothbrush Products
            <span className="text-sm font-normal text-gray-500">({products.toothbrush.length})</span>
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {products.toothbrush.map((product) => (
            <div key={product.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-mint-50 to-teal-50 rounded-xl 
                              flex items-center justify-center text-3xl flex-shrink-0">
                  🦷
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.brand} • {product.price}</p>
                  <div className="flex gap-1 mt-1">
                    {product.features.slice(0, 2).map((f, i) => (
                      <span key={i} className="text-xs bg-mint-50 text-green-600 px-2 py-0.5 rounded">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-teal-600">{product.doctorScore}</p>
                  <p className="text-xs text-gray-500">Doctor Score</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-teal-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RulesTab() {
  const [editingRule, setEditingRule] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Recommendation Rules</h2>
          <p className="text-gray-500 mt-1">Define when to recommend specific products</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-xl 
                         hover:bg-teal-600 transition-colors font-medium">
          <Plus className="w-4 h-4" />
          Create Rule
        </button>
      </div>

      {/* Rule Builder */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Quick Rule Builder</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rule Name</label>
            <input
              type="text"
              placeholder="e.g., High Sensitivity Care"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 
                       focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority (1-10)</label>
            <input
              type="number"
              min="1"
              max="10"
              defaultValue="5"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 
                       focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conditions (When to apply this rule)
          </label>
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <select className="px-3 py-2 border border-gray-200 rounded-lg bg-white">
                <option>Sensitivity</option>
                <option>Gum Health</option>
                <option>Whitening</option>
                <option>Fresh Breath</option>
              </select>
              <select className="px-3 py-2 border border-gray-200 rounded-lg bg-white">
                <option>is greater than</option>
                <option>is less than</option>
                <option>equals</option>
              </select>
              <input
                type="number"
                placeholder="5"
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg"
              />
              <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <button className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700">
              <Plus className="w-4 h-4" />
              Add Condition
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recommend Toothpaste
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {products.toothpaste.map((p) => (
                <label key={p.id} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded text-teal-500" />
                  {p.name}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recommend Toothbrush
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {products.toothbrush.map((p) => (
                <label key={p.id} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded text-teal-500" />
                  {p.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Doctor's Advice (shown to patient)
          </label>
          <textarea
            rows={3}
            placeholder="Enter personalized advice for this condition..."
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 
                     focus:ring-teal-500 focus:border-transparent outline-none resize-none"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-2 bg-teal-500 text-white rounded-xl 
                           hover:bg-teal-600 transition-colors font-medium">
            <Save className="w-4 h-4" />
            Save Rule
          </button>
        </div>
      </div>

      {/* Existing Rules */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Active Rules</h3>
        {recommendationRules.map((rule) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-gray-800">{rule.name}</h4>
                  <span className="px-2 py-1 bg-teal-50 text-teal-600 text-xs rounded-full">
                    Priority: {rule.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Recommends: {rule.recommendToothpaste.join(', ')} + {rule.recommendToothbrush.join(', ')}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500">Conditions:</span>
                  {Object.entries(rule.conditions).map(([key, val]) => (
                    <span key={key} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {key}: {JSON.stringify(val)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-teal-600">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

