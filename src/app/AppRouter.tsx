import { HashRouter, Route, Routes } from 'react-router-dom'
import { AddEditItemPage } from '../pages/AddEditItemPage'
import { AddEditOutfitPage } from '../pages/AddEditOutfitPage'
import { HomePage } from '../pages/HomePage'
import { ItemDetailsPage } from '../pages/ItemDetailsPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { OutfitDetailsPage } from '../pages/OutfitDetailsPage'
import { OutfitsPage } from '../pages/OutfitsPage'
import { ReturnsPage } from '../pages/ReturnsPage'
import { WardrobePage } from '../pages/WardrobePage'
import { RootLayout } from './RootLayout'

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        {/* Bottom-tab root screens */}
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="wardrobe" element={<WardrobePage />} />
          <Route path="outfits" element={<OutfitsPage />} />
          <Route path="returns" element={<ReturnsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Full-screen push routes (no bottom nav) */}
        <Route path="item/new" element={<AddEditItemPage />} />
        <Route path="item/:id" element={<ItemDetailsPage />} />
        <Route path="item/:id/edit" element={<AddEditItemPage />} />
        <Route path="outfit/new" element={<AddEditOutfitPage />} />
        <Route path="outfit/:id" element={<OutfitDetailsPage />} />
        <Route path="outfit/:id/edit" element={<AddEditOutfitPage />} />
      </Routes>
    </HashRouter>
  )
}
