package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	WalletAddress string
	UniqueID      string
}

type Asset struct {
	gorm.Model
	Name   string
	Symbol string
	Price  float64
}

type Trade struct {
	gorm.Model
	FromAssetID uint
	ToAssetID   uint
	Amount      float64
}
