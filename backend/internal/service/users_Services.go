package service

import (
	"context"

	"github.com/vivekchaurasia01/pawnchazer-backend/internal/model"
	"github.com/vivekchaurasia01/pawnchazer-backend/internal/repository"
)

type UserService struct {
	repo repository.UserRepository
}

func NewUserRepository (repo repository.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (u UserService) GetProfile (ctx context.Context, id string) (*model.User, error) {
	return u.repo.GetByID(ctx,id)
}


